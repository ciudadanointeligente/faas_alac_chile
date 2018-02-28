#!/bin/bash
zip -rq temp.zip products.js package.json node_modules
wsk action update spa_dbproducts --kind nodejs:6 temp.zip --web true
rm temp.zip
