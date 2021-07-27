let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M0,25C0,11.19288125423016 11.19288125423016,0 25,0C38.80711874576984,0 50,11.19288125423016 50,25C50,38.80711874576984 38.80711874576984,50 25,50C11.19288125423016,50 0,38.80711874576984 0,25"],["fill","none"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"},{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M12.5,75C12.5,68.09644062711509 18.09644062711508,62.5 25,62.5C31.90355937288492,62.5 37.5,68.09644062711509 37.5,75C37.5,81.90355937288491 31.90355937288492,87.5 25,87.5C18.09644062711508,87.5 12.5,81.90355937288491 12.5,75"],["fill","none"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"}],"visibility":"visible","type":"dom","defs":[]}')
      .end();
  }
};
