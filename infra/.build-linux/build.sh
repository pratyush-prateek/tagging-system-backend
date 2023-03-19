#!/bin/bash

for key in "${{env}}"
do
    echo "$key = ${{env[$key]}}"
done