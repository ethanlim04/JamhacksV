#!/bin/sh

while :
do
	echo "Backing up..."
    ./backup.sh

    echo "Next backup in 10 minutes"
    sleep 600
done
