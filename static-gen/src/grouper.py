from datetime import datetime
import re

# Helps group events according to a criteria (like channel, event, date)

def parse_timestamp(ts):
    ts = re.sub(r'Z$', r'+00:00', ts)
    ts = re.sub(r',\d\d\d', '', ts)
    return datetime.fromisoformat(ts)

def by_channel(events):
    result = {}
    for event in events:
        channel = event['channel']
        if not channel in result:
            result[channel] = []
        result[channel].append(event)
    return result

def by_year_month(events):
    result = {}
    for event in events:
        date = parse_timestamp(event['timestamp'])
        year = date.year
        month = date.month
        if not year in result:
            result[year] = {}
        if not month in result[year]:
            result[year][month] = []
        result[year][month].append(event)
    return result

def by_event(events):
    result = {}
    for event in events:
        k = event['event'] #todo: normalize?
        if not k in result:
            result[k] = []
        result[k].append(event)
    return result
