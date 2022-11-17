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
