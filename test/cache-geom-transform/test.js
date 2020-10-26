let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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')
      .end();
  }
};