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
