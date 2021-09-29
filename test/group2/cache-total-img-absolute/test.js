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
