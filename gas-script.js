/**
 * Google Apps Script — 優式學院報名表單後端
 *
 * 使用方式：
 * 1. 開一個 Google Sheet，第一列標題設為：時間戳記 | 姓名 | 電話 | 從哪裡得知
 * 2. 點選「擴充功能 → Apps Script」
 * 3. 把這段程式碼貼上去，取代預設內容
 * 4. 點「部署 → 新增部署」→ 類型選「網頁應用程式」
 *    - 執行身分：我
 *    - 存取權限：所有人
 * 5. 複製部署後的 URL，貼到 index.html 的 GAS_URL 變數
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('zh-TW'),
      data.name || '',
      data.phone || '',
      data.source || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: '優式學院報名 API 運作中' }))
    .setMimeType(ContentService.MimeType.JSON);
}
