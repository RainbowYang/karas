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