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
