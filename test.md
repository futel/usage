# Running locally and testing

# Get data

This gets the data already aggregated from S3 by the GitHub actions.

- git checkout gh-pages
- git pull
- cp -r data/* web/static/data

# Render

- git checkout main
- perform web/README.md

# Todo

## Get data from S3 and aggregate it

Instead of the "Get data" section, do what the gh-pages branch does, I think.
