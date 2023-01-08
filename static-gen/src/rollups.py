
import sys
from roll_up_tool import RollUpTool

# Recomputes aggregated roll-up data in the data dir

if len(sys.argv) < 2:
    print("Usage: {} <dir>".format(__file__))
    sys.exit(-1)

indir = sys.argv[1]
print("Creating roll-ups in {}".format(indir))

roll = RollUpTool(indir)
roll.rollUpDates()

# Skip rolling up channels and events because we only use date now really
# roll.rollUpChannels()
# roll.rollUpEvents()

print("All done.")
