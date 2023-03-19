#!/bin/bash

services=(
    item-tagger-service,
    item-retrieval-service,
    item-tag-db-update-consumer
)
directory="$ cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && cd .. && pwd)"
echo $directory
