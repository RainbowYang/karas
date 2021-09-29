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
