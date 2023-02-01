#!/usr/bin/env bash

date="$(date +'%Y-%m-%d')";
for world_path in data/*; do
	if [ "${world_path}" != "data/_global-total" ]; then
		ln --symbolic --force "${date}.json" "${world_path}/latest.json";
	fi;
done;
