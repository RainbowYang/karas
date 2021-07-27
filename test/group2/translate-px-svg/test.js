let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M0,0L100,0L100,18.3984375L0,18.3984375L0,0"],["fill","rgba(0,0,255,1)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",0],["y",14.484375],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"1"}]}],"visibility":"visible","transform":"matrix(1,0,0,1,10,0)","type":"dom"},{"bb":[{"type":"item","tagName":"path","props":[["d","M0,18.3984375L100,18.3984375L100,36.796875L0,36.796875L0,18.3984375"],["fill","rgba(255,0,0,1)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",0],["y",32.8828125],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"2"}]}],"visibility":"visible","transform":"matrix(1,0,0,1,0,10)","type":"dom"},{"bb":[{"type":"item","tagName":"path","props":[["d","M0,36.796875L100,36.796875L100,55.1953125L0,55.1953125L0,36.796875"],["fill","rgba(0,255,0,1)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",0],["y",51.28125],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"3"}]}],"visibility":"visible","transform":"matrix(1,0,0,1,10,10)","type":"dom"}],"visibility":"visible","type":"dom","defs":[]}')
      .end();
  }
};
