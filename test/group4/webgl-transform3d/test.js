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
