
import pathlib
import os

# abstraction of the data output dir (pre aggregation)

class DataDir:

    def __init__(self, dir):
        self.dir = pathlib.Path(dir).resolve()

    def getDateDir(self):
        return self.dir / 'date'

    def getDateYears(self):
        return self.getSubdirs(self.getDateDir())

    def getChannelDirs(self):
        return self.getSubdirs(self.dir / 'channel')

    def getEventDirs(self):
        return self.getSubdirs(self.dir / 'events')

    def getSubdirs(self, subdirRoot):
        with os.scandir(subdirRoot) as it:
            dirs = map(lambda x: x.name, filter(lambda x: x.is_dir(), it))
            dirs = map(lambda x: self.dir / subdirRoot / x, dirs)
            return list(dirs)

    def dateYearMonthDir(self, root, year, month):
        return self.yearMonthDir(self.getDateDir(), year, month)

    def yearMonthDir(self, root, year, month):
        return root / "{}/{:02d}".format(year, month)

    # Not recursive, just top level
    def allJsonFiles(self, subdir):
        with os.scandir(self.dir / subdir) as it:
            all = list(it)
            files = filter(lambda x: x.is_file(), all)
            json = filter(lambda x: x.name.endswith(".json"), files)
            return list(map(lambda x: x.path, json))
