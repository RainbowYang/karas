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
