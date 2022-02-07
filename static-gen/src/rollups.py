
import sys
from roll_up_tool import RollUpTool
import event_list

# Recomputes aggregated roll-up data in the data dir

if len(sys.argv) < 2:
    print("Usage: {} <dir>".format(__file__))
    sys.exit(-1)

indir = sys.argv[1]
print("Creating roll-ups in {}".format(indir))

roll = RollUpTool(indir)
roll.rollUpDates()
roll.rollUpChannels()
roll.rollUpEvents()

event_list.write_events(indir)

print("All done.")
