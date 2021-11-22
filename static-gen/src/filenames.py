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

def build_event_year_month_day_file(name, year, month, day):
    d = _build_parented_event_year_month_dir(build_dir(), name, year, month)
    return str(d / '{}{}{}.json'.format(year, month, day))

def data_event_year_month_day_file(name, year, month, day):
    d = _build_parented_event_year_month_dir(data_dir(), name, year, month)
    return str(d / '{}{}{}.json'.format(year, month, day))

def _build_parented_event_year_month_dir(parent, name, year, month):
    return pathlib.Path(parent) / 'events/{}/date/{}/{}'.format(name, year, month)
