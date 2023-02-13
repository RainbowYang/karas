let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .pause(20)
      .assert.value('input', 'data:image/png;base64,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')
      .end();
  }
};