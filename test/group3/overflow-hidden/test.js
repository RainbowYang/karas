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