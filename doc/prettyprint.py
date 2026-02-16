"""
Print metric events from file, one per line.
grep street-roots out.json | sed "s/.*event': '//"|sed "s/'.*//" |sort|uniq -c | sort -n 
"""
import glob
import json

root = "static-gen/build/date/2025/*/*.json"
#root = "data/date/2024/*.json"
files = glob.glob(root)

for f in files:
    with open(f) as json_file:
        for d in json.load(json_file):
            print(d)
