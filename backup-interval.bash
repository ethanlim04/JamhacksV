#!/bin/sh

while :
do
	echo "Backing up..."
    ./backup.sh

    echo -e "Next backup in 10 minutes at $(node -e 'console.log(new Date(Date.now() + 600_000).toString())') \n(currently $(node -e 'console.log(new Date().toString())'))"

    sleep 600
    clear
done
