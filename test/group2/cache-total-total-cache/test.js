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
