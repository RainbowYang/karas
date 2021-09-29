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
