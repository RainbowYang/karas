let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .pause(300)
      .assert.value('input', '9T06:04:16.7171402Z ✔ Testing if value of element <input> equals '0.2,0/0.8,0' (20ms)'0.2,0/0.8,0' (20ms)'0.2,0/0.8,0' (20ms)'0.2,0/0.8,0' (20ms)')
      .end();
  }
};
