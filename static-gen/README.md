
# static gen

Generates static data files from s3 event files.

The goal is to automate this generation so that the data files
in `gh-pages` branch are up-to-date within a few hours, or a day at worst.

## what it does

It detects new or changed data in the s3 bucket and combines the new data
with existing data to produce an updated changeset in the ephemeral `build` dir.

This updated changeset is sync'd back into the data directory and persisted.

All long-term state is kept in the
[`gh-pages` branch](https://github.com/futel/usage/tree/gh-pages/data)
in the [`data`](https://github.com/futel/usage/tree/gh-pages/data) directory.

The [`updated_state.json`](https://github.com/futel/usage/blob/gh-pages/data/updated_state.json)
file keeps track of what s3 data were last seen with what size and time. This
allows us to detect changes in S3 and reprocess the data.

S3 data can be reprocessed by removing keys in the `updated_state.json` file
and re-running the static generator.

# setup

As a developer, you should probably use virtualenv.

```
$ virtualenv env
$ source env/bin/activate
```

Then install the prerequisites:

```
$ pip install -r requirements.txt
```

# running

The main entrypoint is in `src/static-gen.py`. Because it reads from S3, it
requires the usual aws creds to be set up. This is one way:

```
$ export AWS_ACCESS_KEY_ID=<your-key-id>
$ export AWS_SECRET_ACCESS_KEY=<your-key>
$ python src/static-gen.py
```

This app will:

* look at the bucket `logpublish` bucket content for keys prefixed with `events/prod`
* for each key, compare the last updated date and timestamp. If different, continue, else skip file

And finally, if everything worked, we dump an updated version of the `updated_state.json`
file out to the `build/` directory.

# aggregation

tbd (next)


# github action

The GitHub action ties it all together and provides automation.

TBD/WIP
