#!/bin/bash
zip -rq temp.zip landing.js package.json node_modules templates
wsk action create spa_landing --kind nodejs:6 temp.zip --web true
rm temp.zip
