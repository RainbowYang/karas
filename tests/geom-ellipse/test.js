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
