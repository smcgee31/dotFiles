#!/bin/bash
source $PWD/scripts/helpers.sh

YARN_VERSION="$(yarn --version)"
print "YARN Version: $YARN_VERSION"

yarn global add nodemon updtr serverless eslint-config-xo-space > /dev/null
