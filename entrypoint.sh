#!/bin/bash

function install_run_app {

if [ $NODE_ENV = "development" ]; then
 npm run start:dev
fi

if [ $NODE_ENV = "production" ]; then
 npm install
 npm run start:prod
fi

}

install_run_app
