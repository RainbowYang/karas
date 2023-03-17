let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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thA4LaCgTyewsF9BL6B5hMBAAQU9NDS/xTEwOCcTuCmgoG+CNXzcG3RDCm4g8LyAgn7eOL5BQcdJDSRQKaCgK2N5f5SCHhiakwksCCjoBbTTjyjo0wnYT2CPgILe4xzdoqCjnIYRqBVQ0LXRvD5MQQ8MzckEFgQU9ALa6UcU9OkE7CewR0BB73GObhFalNMwAgQI5AQUdM7SJAIECEQFFHSU0zACBAjkBBR0ztIkAgQIRAUUdJTTMAIECOQEFHTO0iQCBAhEBRR0lNMwAgQI5AQUdM7SJAIECEQFFHSU0zACBAjkBBR0ztIkAgQIRAUUdJTTMAIECOQEFHTO0iQCBAhEBRR0lNMwAgQI5AQUdM7SJAIECEQFFHSU0zACBAjkBBR0ztIkAgQIRAUUdJTTMAIECOQEFHTO0iQCBAhEBRR0lNMwAgQI5AQUdM7SJAIECEQFFHSU0zACBAjkBBR0ztIkAgQIRAUUdJTTMAIECOQEFHTO0iQCBAhEBRR0lNMwAgQI5AQUdM7SJAIECEQFFHSU0zACBAjkBBR0ztIkAgQIRAUUdJTTMAIECOQEFHTO0iQCBAhEBRR0lNMwAgQI5AQUdM7SJAIECEQFFHSU0zACBAjkBBR0ztIkAgQIRAUUdJTTMAIECOQEFHTO0iQCBAhEBRR0lNMwAgQI5AQUdM7SJAIECEQFFHSU0zACBAjkBBR0ztIkAgQIRAUUdJTTMAIECOQEFHTO0iQCBAhEBRR0lNMwAgQI5AQUdM7SJAIECEQFFHSU0zACBAjkBBR0ztIkAgQIRAUUdJTTMAIECOQEFHTO0iQCBAhEBRR0lNMwAgQI5AQUdM7SJAIECEQFFHSU0zACBAjkBBR0ztIkAgQIRAUUdJTTMAIECOQEFHTO0iQCBAhEBRR0lNMwAgQI5AQUdM7SJAIECEQFFHSU0zACBAjkBBR0ztIkAgQIRAUUdJTTMAIECOQEFHTO0iQCBAhEBRR0lNMwAgQI5AQUdM7SJAIECEQFFHSU0zACBAjkBBR0ztIkAgQIRAUUdJTTMAIECOQEFHTO0iQCBAhEBRR0lNMwAgQI5AQUdM7SJAIECEQFFHSU0zACBAjkBBR0ztIkAgQIRAUUdJTTMAIECOQEFHTO0iQCBAhEBRR0lNMwAgQI5AQUdM7SJAIECEQFFHSU0zACBAjkBBR0ztIkAgQIRAUUdJTTMAIECOQEFHTO0iQCBAhEBRR0lNMwAgQI5AQUdM7SJAIECEQFFHSU0zACBAjkBBR0ztIkAgQIRAUUdJTTMAIECOQEFHTO0iQCBAhEBRR0lNMwAgQI5AQUdM7SJAIECEQFFHSU0zACBAjkBBR0ztIkAgQIRAUUdJTTMAIECOQEFHTO0iQCBAhEBRR0lNMwAgQI5AQUdM7SJAIECEQFFHSU0zACBAjkBBR0ztIkAgQIRAUUdJTTMAIECOQEFHTO0iQCBAhEBRR0lNMwAgQI5AQUdM7SJAIECEQFFHSU0zACBAjkBBR0ztIkAgQIRAUUdJTTMAIECOQEFHTO0iQCBAhEBRR0lNMwAgQI5AQUdM7SJAIECEQFFHSU0zACBAjkBBR0ztIkAgQIRAUUdJTTMAIECOQEFHTO0iQCBAhEBRR0lNMwAgQI5AQUdM7SJAIECEQF/g9rTGd4XYv/QQAAAABJRU5ErkJggg==')
      .end();
  }
};
