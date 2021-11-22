import json
import grouper
import fs_util

# Helps spread event data around on disk

def by_event(events):
    grouped = grouper.by_event(events)
    # print(json.dumps(grouped, indent=2))
    for name, group in grouped.items():
        print('Event group: {}'.format(name))
        fs_util.mkdir_build_by_event(name)


def update_all(events):
    events = map(lambda x: json.loads(x), events)
    by_event(events)
