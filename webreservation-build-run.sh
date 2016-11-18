#!/bin/sh

if [ "$BUILD" != "" ]; then
  echo "build and run";
  gulp build-run
else
  echo "start"
  gulp server
fi
#node ./src/app.js
