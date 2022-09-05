let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .pause(20)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M0,0L360,0L360,290.390625L0,290.390625L0,0"],["fill","rgba(0,0,255,1)"]]}],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M10,10L350,10L350,261.9921875L10,261.9921875L10,10"],["fill","rgba(255,0,0,1)"]]}],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M20,20L340,20L340,98.3984375L20,98.3984375L20,20"],["fill","rgba(204,204,204,1)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",50],["y",64.484375],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"2"}]}],"visibility":"visible","type":"dom"},{"bb":[],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",20],["y",112.8828125],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"next3"}]}],"visibility":"visible","type":"dom"},{"bb":[{"type":"item","tagName":"path","props":[["d","M20,116.796875L340,116.796875L340,233.59375L20,233.59375L20,116.796875"],["fill","rgba(0,255,0,1)"]]}],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M30,126.796875L330,126.796875L330,205.1953125L30,205.1953125L30,126.796875"],["fill","rgba(204,204,204,1)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",60],["y",171.28125],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"2"}]}],"visibility":"visible","type":"dom"},{"bb":[],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",30],["y",219.6796875],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"next4"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"},{"bb":[],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",20],["y",248.078125],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"next5"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"},{"bb":[],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",10],["y",276.4765625],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"next1"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"},{"bb":[],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",0],["y",304.875],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"next2"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom","defs":[],"lv":1}')
      .end();
  }
};
