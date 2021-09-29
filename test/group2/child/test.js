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
