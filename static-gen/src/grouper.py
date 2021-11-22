
# Helps group events

def by_channel(events):
    pass

def by_event(events):
    result = {}
    for event in events:
        k = event['event'] #todo: normalize?
        if not k in result:
            result[k] = [] 
        result[k].append(event)
    return result
