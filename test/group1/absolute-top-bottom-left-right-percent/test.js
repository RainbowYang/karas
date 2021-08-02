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