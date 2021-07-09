let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .pause(220)
      .assert.value('input', 'data:image/png;base64,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')
      .end();
  }
};
