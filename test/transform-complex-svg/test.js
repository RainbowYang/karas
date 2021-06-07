let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M0,0L100,0L100,100L0,100L0,0"],["fill","rgba(255,0,0,1)"]]}],"children":[],"visibility":"visible","transform":"matrix(0.9961946980917455,0.08715574274765817,-0.06976709961132063,0.997716007240273,-3.298089885153317,95.52801322463073)","type":"dom"}],"visibility":"visible","type":"dom","defs":[]}')
      .end();
  }
};
