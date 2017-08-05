"""
ASGI config for conflict_minerals_data project.

It exposes the ASGI callable as a module-level variable named ``channel_layer``.

https://blog.heroku.com/in_deep_with_django_channels_the_future_of_real_time_apps_in_django
https://channels.readthedocs.io/en/stable/
"""
import os
import channels.asgi

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "conflict_minerals_data.settings")
channel_layer = channels.asgi.get_channel_layer()
