let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M0,0L100,0L100,100L0,100L0,0"],["fill","rgba(255,0,0,1)"]]}],"children":[],"visibility":"visible","transform":"matrix(0.7071067811865476,0.7071067811865475,-0.7071067811865475,0.7071067811865476,150,-20.710678118654755)","type":"dom"},{"bb":[{"type":"item","tagName":"path","props":[["d","M0,100L100,100L100,200L0,200L0,100"],["fill","rgba(255,0,0,1)"]]}],"children":[],"visibility":"visible","transform":"matrix(0.7071067811865476,0.7071067811865475,-0.7071067811865475,0.7071067811865476,170.71067811865476,29.289321881345245)","type":"dom"}],"visibility":"visible","type":"dom","defs":[]}')
      .end();
  }
};
