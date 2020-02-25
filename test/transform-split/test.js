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
