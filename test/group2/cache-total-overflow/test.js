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
