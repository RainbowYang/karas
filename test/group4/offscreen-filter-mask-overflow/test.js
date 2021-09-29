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
