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
