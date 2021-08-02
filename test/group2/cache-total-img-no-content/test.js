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