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