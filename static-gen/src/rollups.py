
import sys
from aggregator import Aggregator

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

print("All done.")
