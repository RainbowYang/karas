let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[],"children":[{"type":"text","children":[]},{"bb":[],"children":[{"type":"text","children":[]}],"visibility":"hidden","type":"dom"}],"visibility":"hidden","type":"dom"}],"visibility":"visible","type":"dom","defs":[]}hidden')
      .end();
  }
};
