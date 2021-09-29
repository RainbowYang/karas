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
