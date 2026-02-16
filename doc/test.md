# Running locally and testing

# Get data

Get the data already aggregated from S3 by the GitHub actions.

- git checkout gh-pages
- git pull
- cp -r data/* web/static/data

Alternately, run the static-gen test locally.

# Render

- git checkout main
- perform doc/web.md
