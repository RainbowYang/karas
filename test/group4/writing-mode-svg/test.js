let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M0,0L100,0L100,100L0,100L0,0"],["fill","rgba(255,0,0,1)"]]}],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M0.5234375,0L36.796875,0L36.796875,88.9844L0.5234375,88.9844L0.5234375,0"],["fill","rgba(0,255,255,1)"]]},{"type":"item","tagName":"path","props":[["d","M37.3203125,0L73.59375,0L73.59375,35.5938L37.3203125,35.5938L37.3203125,0"],["fill","rgba(0,255,255,1)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",18.3984375],["y",0],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","32px"],["writing-mode","vertical-lr"]],"content":"aaaaa"},{"type":"item","tagName":"text","props":[["x",55.1953125],["y",0],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","32px"],["writing-mode","vertical-lr"]],"content":"aa"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"},{"bb":[{"type":"item","tagName":"path","props":[["d","M5,105L105,105L105,205L5,205L5,105"],["fill","rgba(255,0,0,1)"]]}],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M0.5234375,105L46.796875,105L46.796875,198.9844L0.5234375,198.9844L0.5234375,105"],["fill","rgba(0,255,255,1)"]]},{"type":"item","tagName":"path","props":[["d","M37.3203125,105L83.59375,105L83.59375,145.5938L37.3203125,145.5938L37.3203125,105"],["fill","rgba(0,255,255,1)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",23.3984375],["y",110],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","32px"],["writing-mode","vertical-lr"]],"content":"aaaaa"},{"type":"item","tagName":"text","props":[["x",60.1953125],["y",105],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","32px"],["writing-mode","vertical-lr"]],"content":"aa"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom","defs":[]}')
      .end();
  }
};
