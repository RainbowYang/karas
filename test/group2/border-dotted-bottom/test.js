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
