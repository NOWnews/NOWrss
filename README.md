# NOWrss

```
#                       _oo0oo_
#                      o8888888o
#                      88" . "88
#                      (| -_- |)
#                      0\  =  /0
#                    ___/`---'\___
#                  .' \\|     |# '.
#                 / \\|||  :  |||# \
#                / _||||| -:- |||||- \
#               |   | \\\  -  #/ |   |
#               | \_|  ''\---/''  |_/ |
#               \  .-\__  '-'  ___/-. /
#             ___'. .'  /--.--\  `. .'___
#          ."" '<  `.___\_<|>_/___.' >' "".
#         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
#         \  \ `_.   \_ __\ /__ _/   .-` /  /
#     =====`-.____`.___ \_____/___.-`___.-'=====
#                       `=---='
#
#        保庇　保庇　保庇　保庇　保庇　保庇　保庇　噢
```

## 系統資訊

Node.js v8.1.1

## Server 啟動方式

###

### line xml

dev: `npm run cron`

prod:

`npm install`

`NODE_ENV=production pm2 start cron.js --name 'LINE XML UPLOAD'`

### RSS Server

dev: `npm start`

prod:

`npm install`

`NODE_ENV=production pm2 start bin/www.js --name 'RSS_SERVER'`
