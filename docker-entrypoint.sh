#!/bin/bash
set -e

# Function to run Django management commands
django_manage() {
    python3 manage.py "$@"
}

echo "Running Through Docker Entry Point"


# Start Django's development server with auto-reload
if [ "$ENV" = "local" ]; then
    python3 manage.py runserver 0.0.0.0:8000
    #python3 manage.py migrate
    #echo "In local. Running app using daphne..."
    #daphne -b 0.0.0.0 -p 8000 djPine.asgi:application
else
    django_manage collectstatic --noinput
    python3 manage.py migrate
    echo "Running app using daphne..."
    daphne -b 0.0.0.0 -p 8000 djPine.asgi:application
fi