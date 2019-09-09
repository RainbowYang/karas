var path = require('path');
var fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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e+veY/7opfPJl/zxfMaK83t8M3PhdwiuuByHECAQCWyiHTMECBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBALCHQMao4AAQKVgEBXknYIECAQCwh0DGqOAAEClYBAV5J2CBAgEAsIdAxqjgABApWAQFeSdggQIBAL/D/13RSlAlcu0AAAAABJRU5ErkJggg=')
      .end();
  }
};