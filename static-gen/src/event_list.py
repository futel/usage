import json
from data_dir import DataDir

# generates an event list

def write_events(dir):
    dir = DataDir(dir)
    eventDirs = dir.getEventDirs()
    outputFile = eventDirs[0].parent.parent / 'event-list.json'
    print("Generating event list into {}".format(outputFile))
    eventNames = list(map(lambda p: p.name, eventDirs))
    with open(outputFile, 'w') as f:
        json.dump(eventNames, f)
    print("Event list written.")
