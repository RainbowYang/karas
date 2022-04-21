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
