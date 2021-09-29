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
