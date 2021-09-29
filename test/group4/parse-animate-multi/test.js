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
