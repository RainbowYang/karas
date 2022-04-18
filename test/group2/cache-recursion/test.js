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
