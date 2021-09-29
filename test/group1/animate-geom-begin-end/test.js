let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .pause(300)
      .assert.value('input', '9T06:04:14.6928226Z ✔ Testing if value of element <input> equals '0,180/90,100' (18ms)'0,180/90,100' (18ms)'0,180/90,100' (18ms)'0,180/90,100' (18ms)')
      .end();
  }
};
