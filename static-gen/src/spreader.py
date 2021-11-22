import json
import grouper
import fs_util
import filenames
import event_writer

# Helps spread event data around on disk

def events_channel(grouped_events):
    pass

def events_date(grouped_events):
    for name, group in grouped_events.items():
        by_day = grouper.by_day(group)
        # print("{} -> {}".format(name, by_day))
        for year, months in by_day.items():
            for month, events in months.items():
                outdir = filenames.build_event_year_month_dir(name, year, month)
                fs_util.mkdir_safe(outdir)
                event_writer.blend_event_date(name, year, month, events)

def by_event(events):
    grouped = grouper.by_event(events)
    # print(json.dumps(grouped, indent=2))
    for name, group in grouped.items():
        # print('Event group: {}'.format(name))
        fs_util.mkdir_build_by_event(name)
    events_date(grouped)
    events_channel(grouped)

def update_all(events):
    # in s3, each line is its own json doc
    events = map(lambda x: json.loads(x), events)
    by_event(events)
