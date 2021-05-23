#!/bin/sh

while :
do
	echo "Backing up..."
    sleep 1800 &

    ./backup.sh

    echo -e "Next backup in 30 minutes at $(node -e 'console.log(new Date(Date.now() + 1_800_000).toString())') \n(currently $(node -e 'console.log(new Date().toString())'))"

    wait

    clear
done
