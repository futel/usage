
import sys
from aggregator import Aggregator
import event_list

# Recomputes aggregated roll-up data in the data dir

if len(sys.argv) < 2:
    print("Usage: {} <dir>".format(__file__))
    sys.exit(-1)

indir = sys.argv[1]
print("Aggregating roll-ups in {}".format(indir))

agg = Aggregator(indir)
agg.rollUpDates()
agg.rollUpChannels()
agg.rollUpEvents()

event_list.write_events(indir)

print("All done.")
