let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .pause(300)
      .assert.value('input', '9T06:06:17.2330525Z ✔ Testing if value of element <input> equals '180/72' (16ms)'180/72' (16ms)'180/72' (16ms)'180/72' (16ms)')
      .end();
  }
};
