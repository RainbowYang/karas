let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .moveToElement('svg', 101, 101)
      .mouseButtonClick(0)
      .assert.value('input', '0')
      .moveToElement('svg', 1, 1)
      .mouseButtonClick(0)
      .assert.value('input', '0')
      .moveToElement('svg', 101, 101)
      .mouseButtonClick(0)
      .assert.value('input', '1')
      .end();
  }
};
