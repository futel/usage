import event_spreader
import date_spreader
import channel_spreader
import event_parser

# Helps spread event data around on disk


def update_all(lines):
    events = event_parser.parseAll(lines)
    date_spreader.by_date(events)
    # event_spreader.by_event(events)
    # channel_spreader.by_channel(events)
