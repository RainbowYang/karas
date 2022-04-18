let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M0,0L360,0L360,120.7109375L0,120.7109375L0,0"],["fill","rgba(0,0,255,1)"]]}],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M30,30L76.7031,30L76.7031,68.3984375L30,68.3984375L30,30"],["fill","rgba(0,255,0,1)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",40],["y",54.484375],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"123"}]}],"visibility":"visible","type":"dom"},{"bb":[],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",30],["y",86.796875],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"next1"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"},{"bb":[{"type":"item","tagName":"path","props":[["d","M0,120.7109375L360,120.7109375L360,199.109375L0,199.109375L0,120.7109375"],["fill","rgba(255,0,0,1)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",30],["y",165.1953125],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"next"}]}],"visibility":"visible","type":"dom"},{"bb":[],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",0],["y",213.59375],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"next2"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom","defs":[],"lv":0}')
      .end();
  }
};
