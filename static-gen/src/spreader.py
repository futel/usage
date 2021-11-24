import json
import re
import event_spreader
import date_spreader
import channel_spreader

# Helps spread event data around on disk

def fix_channels(events):
    result = []
    for e in events:
        new = dict(e)
        result.append(new)
        new['channel'] = re.sub(r'(SIP).(.*)-.*', r'\1-\2', new['channel'])
    return result

def update_all(events):
    # in s3, each line is its own json doc
    events = map(lambda x: json.loads(x), events)

    events = fix_channels(events)
    event_spreader.by_event(events)
    date_spreader.by_date(events)
    channel_spreader.by_channel(events)
