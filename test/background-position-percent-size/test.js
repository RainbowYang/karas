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
