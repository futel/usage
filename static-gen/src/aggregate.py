
import sys
from channel_year_agg import ChannelYearAggregator

# Recomputes aggregated roll-up data in the data dir

if len(sys.argv) < 2:
    print("Usage: {} <dir>".format(__file__))
    sys.exit(-1)

indir = sys.argv[1]
print("Performing aggregation in {}".format(indir))

agg = ChannelYearAggregator(indir)
agg.create()

print("All done.")
