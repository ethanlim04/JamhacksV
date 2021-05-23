#!/bin/sh

git add .
git commit -am"backup at $(node -e 'console.log((new Date()).toString())')"
git push
