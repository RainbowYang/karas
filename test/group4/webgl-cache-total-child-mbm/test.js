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
