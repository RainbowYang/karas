let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",0],["y",45.28515625],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"a"}]},{"bb":[],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",8.90625],["y",45.28515625],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"b"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"},{"bb":[{"type":"item","tagName":"path","props":[["d","M0,80L18.6875,80L18.6875,159.4765625L0,159.4765625L0,80"],["fill","rgba(255,0,0,1)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",0],["y",125.28515625],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"a"}]},{"bb":[],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",8.90625],["y",125.28515625],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",700],["font-style","normal"],["font-size","16px"]],"content":"b"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"},{"bb":[],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",0],["y",175.28515625],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"a"}]},{"bb":[],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",8.90625],["y",175.28515625],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"b"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom","defs":[]}')
      .end();
  }
};
