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
