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