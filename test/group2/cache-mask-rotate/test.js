let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '9T06:05:25.9879736Z ✔ Testing if value of element <input> equals '' (17ms)')
      .end();
  }
};
