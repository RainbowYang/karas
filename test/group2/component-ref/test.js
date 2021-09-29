let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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')
      .moveToElement('canvas', 10, 10)
      .mouseButtonClick(0)
      .assert.value('input', 'data:image/png;base64,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')
      .end();
  }
};
