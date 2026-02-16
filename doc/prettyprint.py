"""
Print metric events from file, one per line.
"""
import glob
import json

#root = "static-gen/build/date/*/*/*.json"
root = "data/date/2024/*.json"
files = glob.glob(root)

for f in files:
    with open(f) as json_file:
        for d in json.load(json_file):
            print(d)
