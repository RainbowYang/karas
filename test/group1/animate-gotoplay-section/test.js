let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .pause(300)
      .assert.value('input', '9T06:04:27.7976481Z ✔ Testing if value of element <input> equals '150/200' (23ms)'150/200' (23ms)'150/200' (23ms)'150/200' (23ms)')
      .end();
  }
};
