var path = require('path');
var fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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')
      .end();
  }
};
