import os
import pathlib

def build_dir():
    me = os.path.realpath(__file__)
    mydir = pathlib.Path(me).parent
    return str(mydir / '../build')

def make_build_dir():
    b = build_dir()
    try:
      os.mkdir(b)
    except FileExistsError:
      pass
    return b
