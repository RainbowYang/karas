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
