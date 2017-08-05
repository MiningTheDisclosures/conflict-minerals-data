"""
The routes for the channel server
"""
from channels.routing import route
from conflict_minerals_data.edgar.consumers import test

CHANNEL_ROUTING = [
    route('test', test)
]
