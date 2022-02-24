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
