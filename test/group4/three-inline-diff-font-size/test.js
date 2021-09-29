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
