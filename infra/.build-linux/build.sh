#!/bin/bash

services=(
    tagger-retrieval-service,
    user-service,
    item-tag-db-update-consumer
)
for service_name in "${services[@]}"
do
    npm run build -app=$service_name
done
