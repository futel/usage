import grouper
import filenames
import fs_util
import event_writer

# Helps spread stuff around under build/date/*

def by_date(events):
    by_day = grouper.by_year_month(events)
    # print("{} -> {}".format(name, by_day))
    for year, months in by_day.items():
        for month, events in months.items():
            outdir = filenames.build_date_year_month(year, month)

            fs_util.mkdir_safe(outdir)
            event_writer.blend_date(year, month, events)
