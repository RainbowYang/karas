let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .pause(300)
      .assert.value('input', '9T06:04:28.8465366Z ✔ Testing if value of element <input> equals '200/200' (26ms)'200/200' (26ms)'200/200' (26ms)'200/200' (26ms)')
      .end();
  }
};
