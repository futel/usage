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

def mkdir_safe(d):
    os.makedirs(d, exist_ok=True)
    return d

def make_build_dir():
    return mkdir_safe(build_dir())

def mkdir_build_by_event(name):
    p = pathlib.Path(build_dir()) / 'by-event/{}'.format(name)
    return mkdir_safe(p)
