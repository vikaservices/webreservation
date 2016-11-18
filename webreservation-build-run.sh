#!/bin/sh

if [ "$BUILD" != "" ]; then
  echo "build";
  webpack --config ./webpack.prod.config.js --progress --colors
fi

echo "start"
#node ./src/app.js
