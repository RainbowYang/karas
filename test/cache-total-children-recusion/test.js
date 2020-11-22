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
