
import grouper
import fs_util
import filenames
import event_writer

def channel_date(grouped_events):
    for channel, group in grouped_events.items():
        by_day = grouper.by_year_month(group)
        for year, months in by_day.items():
            for month, events in months.items():
                outdir = filenames.build_channel_year_month_dir(channel, year, month)
                fs_util.mkdir_safe(outdir)
                event_writer.blend_channel_date(channel, year, month, events)

def by_channel(events):
    by_channel = grouper.by_channel(events)
    for channel, channel_events in by_channel.items():
        fs_util.mkdir_build_by_channel(channel)
    channel_date(by_channel)
