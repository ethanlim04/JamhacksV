#!/bin/sh

while :
do
	echo "Backing up..."
    sleep 1200 &

    ./backup.sh

    echo -e "Next backup in 20 minutes at $(node -e 'console.log(new Date(Date.now() + 1_200_000).toString())') \n(currently $(node -e 'console.log(new Date().toString())'))"

    wait

    clear
done
