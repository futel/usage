# static gen

Generates static data files from s3 event files.

* look at the bucket `logpublish` bucket content for keys prefixed with `events/prod`
* for each key, compare the last updated date and timestamp. If different, continue, else skip file
* dump an updated version of the `updated_state.json` file out to the `build/` directory.

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

# aggregation

tbd (next)

# github action

The [GitHub action](.github/workflows/generate-static-data.yml) is our
build automation that ties it all together.

Here's what it does:

* clone this repro (`main` branch)
* clone this repo (`gh-pages` branch)
* rsync the `gh-pages` data dir into the `static-gen` subdir
* run the static generator
* rsync the new output data from the `gh-pages/build` dir into the `gh-pages` data dir
p* commit the data back to the gh-pages branch

The action is configured to run every 4 hours.

# data layout

Within the `data` dir, the data is organized in several redundant layouts that
intend to make it easy to access.

```
data /
    events /
       {event-name1} /
       {event-name2} /
       ...
       {event-name-n} /
           channels /
               {channel-name}.json
               ...
               {channel-name}.json
           date /
               {year} /
                   {mon} /
                       {yyyymmdd}.json
    date /
        {year} /
            {mon} /
                {yyyymmdd}.json
    channel /
        {channel-name} /
        ...
        {channel-name} /
            {year} /
                {month} /
                    {yyyymmdd}.json
```

So some example paths are:

* [`data/events/current-time/date/2021/11/20211121.json`](https://futel.github.io/usage/data/events/current-time/date/2021/11/20211121.json) - contains all events on 2021-11-21 requesting the current time feature
* `data/events/ConfbridgeJoin/channels/SIP-680.json` - contains all conference bridge join events from channel `SIP-680`
* [`data/date/2021/11/20211119.json`](https://futel.github.io/usage/data/date/2021/11/20211119.json) - contains all events for 2021-11-19
* `data/channel/SIP-702/date/2021/11/20211117.json` - contains all events for SIP channel 702 on 2021-11-17
