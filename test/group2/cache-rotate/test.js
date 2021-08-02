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