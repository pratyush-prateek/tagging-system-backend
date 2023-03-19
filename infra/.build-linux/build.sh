#!/bin/bash

services=(
    item-tagger-service,
    item-retrieval-service,
    item-tag-db-update-consumer
)
for service_name in "${services[@]}"
do
    npm run build -app=$service_name
done
