#!/usr/bin/python3

import sys
import json
from dateutil import parser
from urllib import request, parse, error

filename = sys.argv[1]

with open(filename) as file:
  doc = file.read()
  events = json.loads(doc)

def chunkify(a_list):
    chunkSize = 100
    for i in range(0, len(a_list), chunkSize):
        yield a_list[i:i + chunkSize]

print(f'There are {len(events)} events')

def to_value(event):
  ts = parser.parse(event['timestamp'])
  ts = ts.strftime("%s")
  return [f"{ts}000000000", json.dumps(event)] 

for chunk in chunkify(events):
  #  print(chunk)
  values = list(map(to_value, chunk))
  body = {
     'streams': [
        {
          "stream": {
            "label": "futel-events",
            # Need a "unique" non-colliding stream label to be able to back fill
            # see https://github.com/grafana/loki/issues/4914
            "batch": "aaa"
          },
          "values": values
        }
     ] 
  }
  data = json.dumps(body) #parse.urlencode(body).encode()
  req =  request.Request("http://192.155.86.197:3100/loki/api/v1/push", data=bytes(data, encoding='utf-8'))
  req.add_header('Content-Type', 'application/json')
  print('Posting a chunk...')
  try:
    with request.urlopen(req) as resp:
      print(f"Response: {resp.status}")
      # if(resp.status != 204):
      #   print(resp.read())
  except error.HTTPError as e:
      print(e)
      print(e.read().decode())
  
  

