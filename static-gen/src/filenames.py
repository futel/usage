import os
import pathlib

def my_dir():
    me = os.path.realpath(__file__)
    return pathlib.Path(me).parent

def build_dir():
    return str(my_dir() / '../build')

# the long term data file location
def data_dir():
    return str(my_dir() / '../data')

def build_event_year_month_dir(name, year, month):
    parent = build_dir()
    return str(_parented_event_year_month_dir(parent, name, year, month))

def build_channel_year_month_dir(channel, year, month):
    parent = build_dir()
    return str(_parented_channel_year_month_dir(parent, channel, year, month))

def _parented_channel_year_month_dir(parent, channel, year, month):
    return pathlib.Path(parent) / 'channel/{}/date/{}/{:02d}'.format(channel, year, month)

def build_event_channel_dir(event_name):
    return str(_parented_event_channel_dir(build_dir(), event_name))

def _parented_event_channel_dir(parent, event_name):
    return pathlib.Path(parent) / 'events/{}/channels'.format(event_name)

def build_event_year_month_day_file(name, year, month, day):
    d = _parented_event_year_month_dir(build_dir(), name, year, month)
    return str(d / '{}{:02d}{:02d}.json'.format(year, month, day))

def data_event_year_month_day_file(name, year, month, day):
    d = _parented_event_year_month_dir(data_dir(), name, year, month)
    return str(d / '{}{:02d}{:02d}.json'.format(year, month, day))

def data_event_channel_file(event_name, channel):
    d = _parented_event_channel_dir(data_dir(), event_name)
    return str(d / '{}.json'.format(channel))

def build_event_channel_file(event_name, channel):
    d = _parented_event_channel_dir(build_dir(), event_name)
    return str(d / '{}.json'.format(channel))

def _parented_event_year_month_dir(parent, name, year, month):
    event_parent = str(pathlib.Path(parent) / 'events/{}'.format(name))
    return parented_date_year_month_dir(event_parent, year, month)

def parented_date_year_month_dir(parent, year, month):
    return pathlib.Path(parent) / 'date/{}/{:02d}'.format(year, month)

def build_date_year_month(year, month):
    return pathlib.Path(build_dir()) / 'date/{}/{:02d}'.format(year, month)

def data_date_year_month(year, month):
    return pathlib.Path(build_dir()) / 'date/{}/{:02d}'.format(year, month)

def data_date_year_month_day_file(year, month, day):
    dir = data_date_year_month(year, month)
    return dir / '{}{:02d}{:02d}.json'.format(year, month, day)

def build_date_year_month_day_file(year, month, day):
    dir = build_date_year_month(year, month)
    return dir / '{}{:02d}{:02d}.json'.format(year, month, day)

def build_channel_year_month_day_file(channel, year, month, day):
    return _parented_channel_year_month_day_file(build_dir(), channel, year, month, day)

def data_channel_year_month_day_file(channel, year, month, day):
    return _parented_channel_year_month_day_file(data_dir(), channel, year, month, day)

def _parented_channel_year_month_day_file(parent, channel, year, month, day):
    dir = pathlib.Path(parent) / 'channel/{}/date/{}/{:02d}'.format(channel, year, month)
    return dir / '{}{:02d}{:02d}.json'.format(year, month, day)
