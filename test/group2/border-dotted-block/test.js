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
