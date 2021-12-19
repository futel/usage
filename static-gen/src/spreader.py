import event_spreader
import date_spreader
import channel_spreader
import event_parser

# Helps spread event data around on disk


def update_all(lines):
    events = event_parser.parseAll(lines)
    event_spreader.by_event(events)
    date_spreader.by_date(events)
    channel_spreader.by_channel(events)
