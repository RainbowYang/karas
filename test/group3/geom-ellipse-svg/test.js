let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M0,25C0,11.19288125423016 22.38576250846032,0 50,0C77.61423749153968,0 100,11.19288125423016 100,25C100,38.80711874576984 77.61423749153968,50 50,50C22.38576250846032,50 0,38.80711874576984 0,25"],["fill","none"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"},{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M25,75C25,68.09644062711509 36.19288125423016,62.5 50,62.5C63.80711874576984,62.5 75,68.09644062711509 75,75C75,81.90355937288491 63.80711874576984,87.5 50,87.5C36.19288125423016,87.5 25,81.90355937288491 25,75"],["fill","none"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"}],"visibility":"visible","type":"dom","defs":[]}')
      .end();
  }
};
