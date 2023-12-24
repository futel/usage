# futel usage

[![generate static data](https://github.com/futel/usage/actions/workflows/generate-static-data.yml/badge.svg)](https://github.com/futel/usage/actions/workflows/generate-static-data.yml)
[![publish gh-pages](https://github.com/futel/usage/actions/workflows/build-and-publish-ui.yml/badge.svg)](https://github.com/futel/s3-event-writer/actions/workflows/build-and-publish-ui.yaml)

Usage data processing and visualization.

https://futel.github.io/usage/

# grafana

testing with a small grafana instance as an alternative

* `apt install -y docker.io docker-compose`
* `docker volume create grafana-storage` - create a volume
* `docker-compose up`

default UI is u/p `admin`/`admin`

to post a log that looks like this:


```
{
  "streams": [
	{
	  "stream": {
		"label": "futel-events"
	  },
	  "values": [
		[ 
		  "1702925489000000000",
		  "{\"timestamp\": \"2023-12-12T21:11:11+00:00\", \"channel\": \"PJSIP-666\", \"event\": \"contact-status-Avail\"}"
		]
	  ]
	}
  ]
}

```

do 

```
curl -i -H 'Content-Type: application/json' -X POST --data-binary @/tmp/test3.json http://localhost:3100/loki/api/v1/push
```

and you'll get a 204 no content


## query/dashboard

grafana/loki logql

```
count_over_time({label="futel-events"} |= `` | json channel="channel", event="event" | label_format chan=`{{ Replace .channel "PJSIP-" "" -1 }}` | label_format chan=`{{ .chan | replace "445" "microcosm"}}` | label_format chan=`{{ .chan | replace "410" "central"}}` | label_format chan=`{{ .chan | replace "615" "robotron"}}` | label_format chan=`{{ .chan | replace "655" "taylor"}}` | label_format chan=`{{ .chan | replace "695" "eighth"}}` | label_format chan=`{{ .chan | replace "620" "sowester"}}` | label_format chan=`{{ .chan | replace "625" "upright"}}` | label_format chan=`{{ .chan | replace "415" "breckenridge"}}` | label_format chan=`{{ .chan | replace "640" "alley27"}}` | label_format chan=`{{ .chan | replace "630" "ypsi"}}` | label_format chan=`{{ .chan | replace "680" "ainsworth"}}` | label_format chan=`{{ .chan | replace "405" "saratoga"}}` | event != `contact-status-Avail` | drop timestamp | drop event, channel, batch, label | __error__=`` [$__auto])
```

those replaces can probably be combined via pipes?

