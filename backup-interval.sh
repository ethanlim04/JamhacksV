#!/bin/bash

while :
do
	echo "Backing up..."
    ./backup.sh

    clear
    echo "Next backup in 10 minutes"

    for i in {9...0}; do
        sleep 60
        echo "Next backup in $i minutes"
    done
done
