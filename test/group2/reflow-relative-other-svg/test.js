let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M0,0L360,0L360,140L0,140L0,0"],["fill","rgba(0,0,255,1)"]]}],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M40,10L380,10L380,130L40,130L40,10"],["fill","rgba(0,255,0,1)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",50],["y",34.484375],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"123"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"},{"bb":[],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",0],["y",154.484375],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"next"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom","defs":[],"lv":0}')
      .end();
  }
};
