release: python manage.py migrate
web: daphne conflict_minerals_data.asgi:channel_layer --port $PORT --bind 0.0.0.0 -v2
worker: python manage.py runworker -v2
worker2: python manage.py runworker -v2
