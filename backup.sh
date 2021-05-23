#!/bin/sh

msg="backup at $(node -e 'Math.random() > 0.9 ? console.log(Math.random() > 0.5 ? \"I am stupid\" : \"I pissed my pants\") : console.log((new Date()).toString())')"

git add .
git commit -am"$msg"
git push
