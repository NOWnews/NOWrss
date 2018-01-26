# Change Log
NOWrss 的所有改變將在此 CHANGELOG 文件中記錄。

格式基於 [Keep a Changelog](http://keepachangelog.com/zh-TW/0.3.0/)
而項目則基於 [Semantic Versioning](http://semver.org/lang/zh-TW/).

## [Unreleased]

## 1.1.14 - 2018-01.26
### Fixed
- ia 顯現不出來的 bug @wb

## 1.1.14 - 2018-01.25
### Fixed
- yahoo 手機版的文字偏小問題 @wb
- 修改後台分類樣式 @wb
- 修改版型名稱，業務提供 @wb

## 1.1.13 - 2017-01.05
### Fixed
- youtube 取 id 防呆機制 @wb

## 1.1.12 - 2017-12.21
### Added
- 增加 Line HK 版型 @jason

## 1.1.11 - 2017-12.14
### Changed
- 調整 YAHOO 版型相關新聞的 tag @wb
- 調整 YAHOO 版型的文字 @wb
- 更換 RSS 的 LOGO 圖 @wb

### Added
- 依業務需求 新增 YAHOO(內文最後加上2篇相關新聞) 版型 @wb

## 1.1.10 - 2017-11.26
### Changed
- 修改comscore代碼 @wayne1025

### Fixed
- YAHOO版型iframe變數防呆 @appleoxxo

## 1.1.10 - 2017-11.15
### Fixed
- 修正XML亂碼問題 @appleoxxo

## 1.1.9 - 2017-10.30
### Fixed
- 新浪台灣版型的相關新聞改端點（避免抓到重複新聞）@appleoxxo
### Added
- 依業務需求新增 XONE(帶 utm 參數) 版型 @wb

## 1.1.8 - 2017-10.24
### Added
- 依業務需求 新增 新浪台灣(內文最後加上2篇相關新聞) 版型 @appleoxxo

### Change
- 移除已經不需要防亂碼程式碼 @appleoxxo
- 新聞內文圖的URL修改 @appleoxxo

## 1.1.7 - 2017-09-13
### Added
- yahoo 濾掉 youtube 影片 @Webber
## Fixed
- 修正 fb rss 取得 youtube id 的方式 @Webber

## 1.1.6 - 2017-08-31
### Change
- yahoo 濾掉 youtube 影片 @Webber
- 修正 fb rss 取得 youtube id 的方式 @Webber
- yahoo 文章內首圖改回之前的格式 @Webber
- db指令 remove 換成 drop @Webber

## 1.1.5 - 2017-08-23
### Change
- 修正 yahoo 文章內首圖的格式 @Webber
- 加上 crontab, 三天一次對 db.counts 的清理 @Webber
- rss 濾掉已知特殊字元 @Webber

## 1.1.4 - 2017-07-27
### Change
- 調整RSS新聞時間晚3分鐘 @appleoxxo

## 1.1.3 - 2017-07-27
### Change
- rss fb ia 影片新聞的影片拉到文中 @Webber
- rss 濾掉已知特殊字元 @Webber

## 1.1.2 - 2017-07-24
### Change
- rss fb ia 加上 投影片模式 @Webber

## 1.1.1 - 2017-07-03
### Change
- 加入內文圖判斷機制，是 nownews 的圖才會加上 imgapi @Webber

## 1.0.14 - 2017-05-09
### Change
- 加入 LINE 專屬的 HEAD `LineBase.xml` @Webber

## 1.0.13 - 2017-01-09
### Change
- 加上過期機制 `libs/checkDateRange.js`  @Webber
- RSS 列表頁加上過期狀態
- RSS 會判斷是否過期，過期會給 404 頁面

## 1.0.12 - 2016-11-18
### Change
- 調整 `libs/getNeedNewsFromMongo.js` 加入一個參數，讓 facebook instant article 可以繞過圖片判斷的機制 @SimonSun

## 1.0.11 - 2016-11-11
### Change

- 加入社群使用版型 @Webber

## 1.0.10 - 2016-11-03
### Change

- 加入 ga 來源參數，新聞標題 @SimonSun

## 1.0.9 - 2016-10-25
### Change

- 加入 facebook instant article 的追蹤碼 @SimonSun
- facebook instant article 廣告數量增加一倍 @SimonSun

## 1.0.8 - 2016-10-13
### Change

- 卡掉有問題的新聞 (2269796) @webber

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
