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
