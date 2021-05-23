#!/bin/sh

msg="$(node -e 'const rand = Math.random(); rand > 0.7 ? console.log(rand > 0.9 ? '\''I am stupid'\'' : rand > 0.8 ? '\''I crapped my pants'\'' : '\''I pisssed the bed'\'') : console.log('\''backup at'\'', (new Date()).toString())')"

yarn format
git add .
git commit -am"$msg"
git push
