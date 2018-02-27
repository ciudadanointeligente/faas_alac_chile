#!/bin/bash
wsk action invoke spa_landing --result
wsk action get spa_landing --url
