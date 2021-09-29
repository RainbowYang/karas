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
