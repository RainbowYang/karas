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
