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
