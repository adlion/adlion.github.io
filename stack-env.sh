#!/bin/sh
 gnome-terminal --tab -t 'local-traefik' -- bash -ic "cd ~/Desktop/local/traefik_dev; docker-compose  -f docker-compose.yml up;"
 gnome-terminal --tab -t 'local-redis' -- bash -ic "cd ~/Desktop/local/databases/redis; docker-compose  -f docker-compose.yml  up;"
 gnome-terminal --tab -t 'local-mysql' -- bash -ic "cd ~/Desktop/local/databases/mysql; docker-compose --env-file env.env -f docker-compose.yml up;"
