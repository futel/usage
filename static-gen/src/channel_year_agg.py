import pathlib
import json
import re
from data_dir import DataDir
import fs_util

EPOCH = '1970-01-01T00:00:00+00:00'

# Aggregates and creates summary files for every year of every channel
class ChannelYearAggregator:

    def __init__(self, dir):
        self.dir = DataDir(dir)

    def create(self):
        channelDirs = self.dir.getChannelDirs()
        for channelDir in channelDirs:
            self.createChannel(DataDir(channelDir))

    def createChannel(self, channelDir):
        print(channelDir.dir)
        jsonFiles = channelDir.allJsonFiles('date')
        for jf in jsonFiles:
            jf = pathlib.Path(jf)
            if re.match('^\d\d\d\d.json$', jf.name):
                self.createYear(channelDir, jf)


    def createYear(self, channelDir,  yearFile):
        year = re.match('^(\d\d\d\d).json$', yearFile.name)[1]
        print("\nAggregating {} from {}".format(year, yearFile.resolve()))
        events = fs_util.read_all_events(yearFile)
        byDate = self._byDate(events)
        totals = self._totals(events)
        latest = self._latestByEvent(events)
        completeLatest = self._completeLatest(latest)
        agg = { 'by_day': byDate, 'totals': totals, 'latest': latest,
                'complete_latest': completeLatest}
        filename = channelDir.dir / 'date' / "{}_agg.json".format(year)
        with open(filename, 'w') as f:
            json.dump(agg, f)

    def _byDate(self, events):
        agg = dict()
        for event in events:
            date = re.sub(r'T.*', '', event['timestamp'])
            if date not in agg:
                agg[date] = dict()
            eventName = event['event']
            if eventName not in agg[date]:
                agg[date][eventName] = 0
            agg[date][eventName] += 1
        return agg

    def _totals(self, events):
        agg = dict()
        for event in events:
            eventName = event['event']
            if eventName not in agg:
                agg[eventName] = 0
            agg[eventName] += 1
        return agg

    def _latestByEvent(self, events):
        agg = dict()
        for event in events:
            timestamp = event['timestamp']
            eventName = event['event']
            if eventName not in agg:
                agg[eventName] = EPOCH
            if timestamp > agg[eventName]:
                agg[eventName] = timestamp
        return agg

    def _completeLatest(self, latest):
        completeLatest = {'event': 'bs', 'timestamp': EPOCH}
        for event,timestamp in latest.items():
            if timestamp > completeLatest['timestamp']:
                completeLatest['event'] = event
                completeLatest['timestamp'] = timestamp
        return completeLatest
