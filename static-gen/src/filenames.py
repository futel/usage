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
    p = pathlib.Path(build_dir()) / 'events/{}/date/{}/{}'.format(name, year, month)
    return str(p)

def build_event_channel_dir(event_name):
    return str(_parented_event_channel_dir(build_dir(), event_name))

def _parented_event_channel_dir(parent, event_name):
    return pathlib.Path(parent) / 'events/{}/channels'.format(event_name)

def build_event_year_month_day_file(name, year, month, day):
    d = _parented_event_year_month_dir(build_dir(), name, year, month)
    return str(d / '{}{}{}.json'.format(year, month, day))

def data_event_year_month_day_file(name, year, month, day):
    d = _parented_event_year_month_dir(data_dir(), name, year, month)
    return str(d / '{}{}{}.json'.format(year, month, day))

def data_event_channel_file(event_name, channel):
    d = _parented_event_channel_dir(data_dir(), event_name)
    return str(d / '{}.json'.format(channel))

def build_event_channel_file(event_name, channel):
    d = _parented_event_channel_dir(build_dir(), event_name)
    return str(d / '{}.json'.format(channel))

def _parented_event_year_month_dir(parent, name, year, month):
    return pathlib.Path(parent) / 'events/{}/date/{}/{}'.format(name, year, month)
