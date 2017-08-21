#!/bin/bash

##
# 輸入 `crontab -e`
# 0 0 */3 * * /{path}/execute_3day.sh
#
# log 的路徑會是 /{path}/crontabScript/execute_3day_log.txt
# mongo script 的路徑會是 /{path}/crontabScript/removeCounts.js
##

/bin/date +"====== %Y %m-%d %H:%M ======" >> /home/nodejs_service/NOWrss/crontabScript/execute_3day_log.txt;
mongo < /home/nodejs_service/NOWrss/crontabScript/removeCounts.js >> /home/nodejs_service/NOWrss/crontabScript/execute_3day_log.txt;