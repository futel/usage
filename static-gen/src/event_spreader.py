import fs_util
import grouper
import filenames
import event_writer

# builds the tree under build/events/*

def events_channel(grouped_events):
    for event_name, group in grouped_events.items():
        by_channel = grouper.by_channel(group)
        outdir = filenames.build_event_channel_dir(event_name)
        fs_util.mkdir_safe(outdir)
        for channel, events in by_channel.items():
            event_writer.blend_event_channel(event_name, channel, events)
            # print("{} -> {}".format(channel,events))

def events_date(grouped_events):
    for event_name, group in grouped_events.items():
        by_day = grouper.by_year_month(group)
        # print("{} -> {}".format(name, by_day))
        for year, months in by_day.items():
            for month, events in months.items():
                outdir = filenames.build_event_year_month_dir(event_name, year, month)
                fs_util.mkdir_safe(outdir)
                event_writer.blend_event_date(event_name, year, month, events)

def by_event(events):
    grouped = grouper.by_event(events)
    for name, group in grouped.items():
        fs_util.mkdir_build_by_event(name)
    events_date(grouped)
    events_channel(grouped)
