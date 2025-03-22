#!/usr/bin/env bash
set -e

./torproxy.sh &
sleep 5 &
npm start &
wait -n