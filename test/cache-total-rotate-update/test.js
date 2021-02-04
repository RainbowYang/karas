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
