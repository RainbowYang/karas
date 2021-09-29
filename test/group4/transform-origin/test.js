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
