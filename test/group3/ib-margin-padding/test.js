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
