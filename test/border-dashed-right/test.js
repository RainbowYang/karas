var path = require('path');
var fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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')
      .end();
  }
};