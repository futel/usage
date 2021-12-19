import json
import re

def parseAll(lines):
    return [parse(line) for line in lines]

def parse(line):
    # in s3, each line is its own json doc
    event = json.loads(line)
    event = fix_channel(event)
    event = normalize_event_name(event)
    return event

def fix_channel(event):
    result = dict(event)
    result['channel'] = re.sub(r'(SIP).(.*)-.*', r'\1-\2', result['channel'])
    return result

def normalize_event_name(event):
    event['event'] = re.sub(r'_', '-', event['event'])
    return event
