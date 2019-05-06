#!/usr/bin/env bash
docker run \
-p 3000:80 \
-d --name vueApp \
vuenginxcontainer
