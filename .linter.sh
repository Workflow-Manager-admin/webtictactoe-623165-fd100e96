#!/bin/bash
cd /tmp/kavia/workspace/code-generation/webtictactoe-623165-fd100e96/frontend_react
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

