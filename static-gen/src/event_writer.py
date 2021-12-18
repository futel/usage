
from grouper import parse_timestamp
import fs_util
import filenames

def write_unique(all_events, file):
    uniques = list({str(v):v for v in all_events}.values())
    uniques.sort(key=lambda x : x.get('timestamp'))
    fs_util.write_all_events(file, uniques)

# Blends existing event/year/month data with new
def blend_event_date(event, year, month, events):
    infiler = lambda day: filenames.data_event_year_month_day_file(event, year, month, day)
    outfiler = lambda day: filenames.build_event_year_month_day_file(event, year, month, day)
    _by_day_blender(events, infiler, outfiler)

# Blends existing date/{year}/{month} data with new
def blend_date(year, month, events):
    infiler = lambda day: filenames.data_date_year_month_day_file(year, month, day)
    outfiler = lambda day: filenames.build_date_year_month_day_file(year, month, day)
    _by_day_blender(events, infiler, outfiler)

def blend_channel_date(channel, year, month, events):
    infiler = lambda day: filenames.data_channel_year_month_day_file(channel, year, month, day)
    outfiler = lambda day: filenames.build_channel_year_month_day_file(channel, year, month, day)
    _by_day_blender(events, infiler, outfiler)

def _by_day_blender(events, infile_lambda, outfile_lambda):
    days = map(lambda x: parse_timestamp(x['timestamp']), events)
    days = map(lambda d: d.day, days)
    days = set(days)
    for day in days:
        infile = infile_lambda(day)
        outfile = outfile_lambda(day)
        _blend(infile, outfile, events)

def blend_event_channel(event_name, channel, events):
    infile = filenames.data_event_channel_file(event_name, channel)
    outfile = filenames.build_event_channel_file(event_name, channel)
    _blend(infile, outfile, events)

def _blend(infile, outfile, events):
    in1 = fs_util.read_all_events(infile)
    in2 = fs_util.read_all_events(outfile)
    write_unique(in1 + in2 + events, outfile)
