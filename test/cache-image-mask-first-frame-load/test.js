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
