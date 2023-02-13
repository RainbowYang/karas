let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .pause(200)
      .assert.value('input', 'data:image/png;base64,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')
      .end();
  }
};
