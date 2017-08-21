#!/bin/bash

##
# 輸入 `crontab -e`
# 0 0 */3 * * /{path}/execute_3day.sh
#
##

/bin/date +"====== %Y %m-%d %H:%M ======" >> /home/execute_3day_log.txt;
mongo < ./removeCounts.js >> ./execute_3day_log.txt;