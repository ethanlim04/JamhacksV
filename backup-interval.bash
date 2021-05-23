#!/bin/sh

while :
do
	echo "Backing up..."
    ./backup.sh

    clear
    echo "Next backup in 10 minutes at $(node -e 'console.log(new Date(Date.now() + 600_000).toString())') (currently $(node -e 'console.log(new Date().toString())'))"

    sleep 600
done
