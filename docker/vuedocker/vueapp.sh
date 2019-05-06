#!/usr/bin/env bash
docker run \
-p 3000:80 \
-d --name vuenginx \
--mount type=bind,source=/Users/truexin/truexin/frontend-daily-learning/docker/vuedocker/nginx,target=/etc/nginx/conf.d \
--mount type=bind,source=/Users/truexin/truexin/frontend-daily-learning/docker/vuedocker/dist,target=/usr/share/nginx/html \
nginx
