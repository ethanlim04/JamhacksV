#!/bin/sh

while :
do
	echo "Backing up..."
    ./backup.sh

    clear
    echo "Next backup in 10 minutes at $(node -e 'new Date(Date.now() + 600_000).toString()')"

    sleep 600
done
