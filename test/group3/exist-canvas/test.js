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