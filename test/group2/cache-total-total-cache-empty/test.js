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
