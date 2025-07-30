#!/bin/sh
set -e

# Wait for MySQL
if [ -n "$DB_HOST" ]; then
  echo "Waiting for MySQL at $DB_HOST:$DB_PORT..."
  until nc -z "$DB_HOST" "$DB_PORT"; do
    sleep 3
    echo "Still waiting for MySQL..."
  done
fi

php artisan migrate:reset

echo "Ensuring session table migration exists..."
php artisan session:table || echo "Session table migration already exists."

echo "Linking storage directory..."
php artisan storage:link || echo "Storage link already exists."

echo "Running database migrations..."
php artisan migrate --force

echo "Running database seeders..."
php artisan db:seed

echo "Starting Laravel development server..."
exec php artisan serve --host=0.0.0.0 --port=8000