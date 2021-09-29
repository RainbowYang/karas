let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .pause(300)
      .assert.value('input', '9T06:04:13.6242373Z ✔ Testing if value of element <input> equals '0,0,0,1/true' (22ms)'0,0,0,1/true' (22ms)'0,0,0,1/true' (22ms)'0,0,0,1/true' (22ms)')
      .end();
  }
};
