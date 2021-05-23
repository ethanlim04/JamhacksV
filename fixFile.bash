#!/bin/bash

if [[ "$1" == "" ]]; then
    echo "no file given"
else
    contents="$(cat "$1")"

    echo "" > "$1"
    echo "$contents" > "$1"
fi
