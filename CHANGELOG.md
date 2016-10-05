# Change Log
NOWrss 的所有改變將在此 CHANGELOG 文件中記錄。

格式基於 [Keep a Changelog](http://keepachangelog.com/zh-TW/0.3.0/)
而項目則基於 [Semantic Versioning](http://semver.org/lang/zh-TW/).

## 1.0.7 - 2016-10-05
### Change

修正時間格式

```
  一般 - Wed 02 Oct 2002 15:00:00 +0200`
  台哥大 - Wed Oct 02 2002 15:00:00 GMT+0200`
  雅虎 - Wed, 02 Oct 2002 15:00:00 GMT+02:00`
```
@webber

## 1.0.6 - 2016-10-04
### Change

修正時間格式

```
  一般 - Wed 02 Oct 2002 15:00:00 +0200`
  台哥大 - Wed Oct 02 2002 15:00:00 GMT+02:00`
  雅虎 - Wed, 02 Oct 2002 15:00:00 GMT+02:00`
```
@webber

## 1.0.5 - 2016-10-04
### Change

修正時間格式

```
  一般 - Wed 02 Oct 2002 15:00:00 +0200`
  台哥大 - Wed 02 Oct 2002 15:00:00 GMT+02:00`
  雅虎 - Wed, 02 Oct 2002 15:00:00 GMT+02:00`
```
@webber

## 1.0.4 - 2016-10-04
### Change
- 修正台哥大 item 時間格式 `Wed 02 Oct 2002 15:00:00 GMT+02:00` `libs/buildRssFromNews.js` @webber
- 修正台哥大 channel 時間格式 `Wed 02 Oct 2002 15:00:00 GMT+02:00` `server/controllers/rssGet.js` @webber

## 1.0.3 - 2016-10-03
### Change
- 修正 default 時間格式 `Wed, 02 Oct 2002 15:00:00 +0200` `server/controllers/rssGet.js` @webber

## 1.0.2 - 2016-10-02
### Added
- 加入台哥大專屬的 HEAD `taiwanMobileBase.xml` @webber
### Change
- 將台哥大專屬的 HEAD 放到 `taiwan-mobile.xml` @webber

## 1.0.1 - 2016-09-30
### Added
- 加入 CHANGELOG 文件做紀錄 @webber
- 定版本 @webber
- 補上 README 資訊 @webber
- 第一個版本正式上線 @webber
