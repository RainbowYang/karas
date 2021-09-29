let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .pause(300)
      .assert.value('input', '9T06:04:37.5764606Z ✔ Testing if value of element <input> equals '200,200' (16ms)'200,200' (16ms)'200,200' (16ms)'200,200' (16ms)')
      .end();
  }
};
