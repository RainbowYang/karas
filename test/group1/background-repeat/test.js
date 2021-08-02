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