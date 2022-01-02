# futel usage

Usage data processing and visualization.

https://futel.github.io/usage/

# static-gen

The [`static-gen`](./static-gen) directory contains the source for
the static _data_ generator, which pulls event data from s3 and
spreads it around as `json` files in the `gh-pages` branch.

# web

The [`web`](./web) directory contains the source for the [web ui](https://futel.github.io/usage/),
hosted on `gh-pages`.

# actions

* Every 4 hours, the `generate-static-data` github action runs. This detects
  changes in S3 and updates the static data in the `gh-pages` branch. The state
  of what has been processed is kept
  [in this file](https://github.com/futel/usage/blob/gh-pages/data/updated_state.json).
* Any commits to the main branch will trigger the `build-and-publish-ui`
  action to be triggered. This action rebuilds the web ui and publishes it
  back to the gh-pages branch.
