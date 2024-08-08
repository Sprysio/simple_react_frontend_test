#!/bin/sh

# Replace placeholders in JavaScript files
for file in /usr/share/nginx/html/assets/*.js; do
  sed -i "s|#VITE_SERVER_HOST#|${VITE_SERVER_HOST}|g" $file
  sed -i "s|#VITE_API_KEY#|${VITE_API_KEY}|g" $file
done

exec "$@"