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
