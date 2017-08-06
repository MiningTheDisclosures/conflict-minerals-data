release: python manage.py migrate
web: daphne conflict_minerals_data.asgi:channel_layer --port $PORT --bind 0.0.0.0 -v2
worker_edgar: python manage.py runworker -v2 --only-channels=edgar.*
worker: python manage.py runworker -v2 --exclude-channels=edgar.*
