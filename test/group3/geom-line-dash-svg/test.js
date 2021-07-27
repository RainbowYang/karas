let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M0,0L100,100"],["fill","none"],["stroke","rgba(0,0,0,1)"],["stroke-width",1],["stroke-dasharray","2,2"]]}],"visibility":"visible","type":"geom"}],"visibility":"visible","type":"dom","defs":[]}')
      .end();
  }
};
