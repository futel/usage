# futel usage

[![generate static data](https://github.com/futel/usage/actions/workflows/generate-static-data.yml/badge.svg)](https://github.com/futel/usage/actions/workflows/generate-static-data.yml)
[![publish gh-pages](https://github.com/futel/usage/actions/workflows/build-and-publish-ui.yml/badge.svg)](https://github.com/futel/s3-event-writer/actions/workflows/build-and-publish-ui.yaml)

Usage data processing and visualization.

https://futel.github.io/usage/

# grafana

testing with a small grafana instance as an alternative

* `docker volume create grafana-storage` - create a volume
* docker-compose up

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
