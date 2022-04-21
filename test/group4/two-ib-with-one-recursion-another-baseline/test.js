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
