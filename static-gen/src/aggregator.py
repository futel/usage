
from data_dir import DataDir
import fs_util
import json
from functools import reduce

# does all the aggregation

class Aggregator:

    def __init__(self, dir):
        self.dir = DataDir(dir)

    def rollUpDates(self):
        years = self.dir.getDateYears()
        print(years)
        for year in years:
            self._rollUpYear(year)

    def rollUpChannels(self):
        pass

    # aggregattes a single year, which includes aggregating all
    # months that exist for that year
    def _rollUpYear(self, yearDir):
        monthDirs = self.dir.getSubdirs(yearDir)
        [self._rollUpMonth(m) for m in monthDirs]
        allMonthFiles = self.dir.allJsonFiles(yearDir)
        yearData = self._combine(allMonthFiles)
        yearFile = str(yearDir) + '.json'
        print("------------")
        print(yearFile)
        fs_util.write_all_events(yearFile, yearData)

    def _rollUpMonth(self, monthDir):
        print("------------\nAggregating {}".format(monthDir))
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
