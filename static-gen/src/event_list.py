import sys
import json
import datetime
from datetime import date
from data_dir import DataDir

# generates a set of unique events

def read_events(dir):
    file = dir / 'event-list.json'
    with open(file, 'r') as file:
        return json.load(file)

def write_events(dir, events):
    file = dir / 'event-list.json'
    with open(file, "w") as outfile:
        outfile.write(json.dumps(sorted(events)))

def get_event_names_for_date(dir, targetDate):
    year_month_dir = dir.dateYearMonthDir(targetDate.year, targetDate.month)
    file = year_month_dir / targetDate.strftime("%Y%m%d.json")
    with open(file, 'r') as file:
        data = json.load(file)
        return set(map(lambda event: event['event'], data))

# Read most 3 days of events
def read_past_events(dir):
    result = set()
    dates = map(lambda i: date.today() - datetime.timedelta(i), range(0,3))
    for d in dates:
        events = get_event_names_for_date(dir, d)
        result.update(events)
    return result

if __name__ == "__main__":

    if len(sys.argv) < 2:
        print("Usage: {} <dir>".format(__file__))
        sys.exit(-1)

    indir = sys.argv[1]
    dir = DataDir(indir)

    events = read_events(dir.dir)
    print(json.dumps(sorted(events)))
    latest_events = read_past_events(dir)

    all = set(events)
    all.update(latest_events)
    write_events(dir.dir, list(all))