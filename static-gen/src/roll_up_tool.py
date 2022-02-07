
from data_dir import DataDir
import fs_util
import json
from functools import reduce

# does all the roll ups (data combining)

class RollUpTool:

    def __init__(self, dir):
        self.dir = DataDir(dir)

    def rollUpDates(self):
        years = self.dir.getDateYears()
        print(years)
        [self._rollUpYear(y) for y in years]

    def rollUpChannels(self):
        channelDirs = self.dir.getChannelDirs()
        [self._rollUpChannel(ch) for ch in channelDirs]

    def rollUpEvents(self):
        eventDirs = self.dir.getEventDirs()
        [self._rollUpEvent(ev) for ev in eventDirs]

    def _rollUpEvent(self, eventDir):
        print("Event: {}".format(eventDir))
        dataDir = DataDir(eventDir)
        yearDirs = dataDir.getDateYears()
        [self._rollUpYear(y) for y in yearDirs]

    def _rollUpChannel(self, channelDir):
        print("Channel: {}".format(channelDir))
        chDir = DataDir(channelDir)
        yearDirs = chDir.getDateYears()
        [self._rollUpYear(y) for y in yearDirs]

    # rolls up (combines) a single year, which includes combining all
    # months that exist for that year
    def _rollUpYear(self, yearDir):
        monthDirs = self.dir.getSubdirs(yearDir)
        [self._rollUpMonth(m) for m in monthDirs]
        allMonthFiles = self.dir.allJsonFiles(yearDir)
        yearData = self._combine(allMonthFiles)
        yearFile = str(yearDir) + '.json'
        print("Year: {}".format(yearFile))
        fs_util.write_all_events(yearFile, yearData)

    def _rollUpMonth(self, monthDir):
        print("Rolling up {}".format(monthDir))
        files = self.dir.allJsonFiles(monthDir)
        monthData = self._combine(files)
        monthFile = str(monthDir) + ".json"
        print(monthFile)
        fs_util.write_all_events(monthFile, monthData)

    def _combine(self, files):
        result = map(lambda file: fs_util.read_all_events(file), files)
        result = reduce(list.__add__, result)
        result.sort(key = lambda x: x.get('timestamp'))
        return result
