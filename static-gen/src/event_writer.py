
from grouper import parse_timestamp
import fs_util
import filenames

# Blends existing event/year/month data with new
def blend_event_date(event, year, month, events):
    days = map(lambda x: parse_timestamp(x['timestamp']), events)
    days = map(lambda d: d.day, days)
    days = set(days)
    print(days)
    for day in days:
        infile = filenames.data_event_year_month_day_file(event, year, month, day)
        outfile = filenames.build_event_year_month_day_file(event, year, month, day)
        in1 = fs_util.read_all_events(infile)
        in2 = fs_util.read_all_events(outfile)
        all = in1 + in2 + events
        uniques = list({str(v):v for v in all}.values())
        uniques.sort(key=lambda x : str(x))
        fs_util.write_all_events(outfile, uniques)
