#!/bin/bash

docker rm -f smart-monitor-iam
docker run --pull=always -d \
-v /root/app/smart-monitor-iam/assets:/app/assets \
-p 0.0.0.0:3456:3456 \
--restart unless-stopped \
--name smart-monitor-iam 103.20.144.134:80/develop/smart-monitor-iam:latest