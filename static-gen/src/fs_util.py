import os
import pathlib
from filenames import build_dir
import json

def mkdir_safe(d):
    os.makedirs(d, exist_ok=True)
    return d

def make_build_dir():
    return mkdir_safe(build_dir())

def mkdir_build_by_event(name):
    p = pathlib.Path(build_dir()) / 'events/{}'.format(name)
    return mkdir_safe(p)

def mkdir_build_by_channel(channel):
    p = pathlib.Path(build_dir()) / 'channel/{}'.format(channel)
    return mkdir_safe(p)

def read_all_events(filename):
    if not os.path.exists(filename):
        return []
    with open(filename) as f:
        file = f.read()
        return json.loads(file)

def write_all_events(filename, events):
    with open(filename, 'w') as f:
        json.dump(events, f)
