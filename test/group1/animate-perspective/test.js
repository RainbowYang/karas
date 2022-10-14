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
