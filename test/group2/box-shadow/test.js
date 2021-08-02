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