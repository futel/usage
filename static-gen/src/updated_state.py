
import json
import os
import fs_util
import filenames
import pathlib

# locally keeps track of what remote s3 files we've completed processing

STATE_FILE = 'updated_state.json'

_existing = str(pathlib.Path(filenames.data_dir()) / STATE_FILE)

_state = {}
if os.path.exists(_existing):
    with open(_existing) as f:
        file = f.read()
        _state = json.loads(file)

def is_updated(item):
    key = item['key']
    if not key in _state:
        return False
    existing = _state[key]
    return (item['size'] == existing['size']) and (item['ts'] == existing['ts'])

def update(item):
    _state[item['key']] = {
        'size': item['size'],
        'ts': item['ts']
    }

def flush_write():
    buildDir = fs_util.make_build_dir()
    # print(buildDir)
    with open('{}/{}'.format(buildDir, STATE_FILE), 'w') as outfile:
        json.dump(_state, outfile, indent=2)
