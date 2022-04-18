let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M10,10L60,10L60,55.99609375L10,55.99609375L10,10"],["fill","rgba(204,204,204,1)"]]}],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M10,31.7265625L113.90625,31.7265625L113.90625,49.6015625L10,49.6015625L10,31.7265625"],["fill","rgba(255,0,0,1)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",10],["y",46.2109375],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"22222"}]},{"bb":[{"type":"item","tagName":"path","props":[["d","M54.5,7L105,7L105,57.6875L54.5,57.6875L54.5,7"],["fill","rgba(0,0,255,0.3)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",57.5],["y",46.2109375],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",700],["font-style","normal"],["font-size","40px"]],"content":"33"}]}],"visibility":"visible","type":"dom"},{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",105],["y",46.2109375],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"2"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"},{"bb":[{"type":"item","tagName":"path","props":[["d","M10,65.99609375L60,65.99609375L60,157.98828125L10,157.98828125L10,65.99609375"],["fill","rgba(204,204,204,1)"]]}],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M10,87.72265625L79.75,87.72265625L79.75,105.59765625L10,105.59765625L10,87.72265625"],["fill","rgba(255,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M10,133.71875L44.15625,133.71875L44.15625,151.59375L10,151.59375L10,133.71875"],["fill","rgba(255,0,0,1)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",10],["y",102.20703125],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"22222"}]},{"bb":[{"type":"item","tagName":"path","props":[["d","M54.5,62.99609375L79.75,62.99609375L79.75,113.68359375L54.5,113.68359375L54.5,62.99609375"],["fill","rgba(0,0,255,0.3)"]]},{"type":"item","tagName":"path","props":[["d","M10,108.9921875L35.25,108.9921875L35.25,159.6796875L10,159.6796875L10,108.9921875"],["fill","rgba(0,0,255,0.3)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",57.5],["y",102.20703125],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",700],["font-style","normal"],["font-size","40px"]],"content":"3"},{"type":"item","tagName":"text","props":[["x",10],["y",148.203125],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",700],["font-style","normal"],["font-size","40px"]],"content":"3"}]}],"visibility":"visible","type":"dom"},{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",35.25],["y",148.203125],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"2"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"},{"bb":[{"type":"item","tagName":"path","props":[["d","M10,167.98828125L60,167.98828125L60,223.8984375L10,223.8984375L10,167.98828125"],["fill","rgba(204,204,204,1)"]]}],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M10,192.71484375L113.90625,192.71484375L113.90625,210.58984375L10,210.58984375L10,192.71484375"],["fill","rgba(255,0,0,1)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",10],["y",207.19921875],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"22222"}]},{"bb":[{"type":"item","tagName":"path","props":[["d","M54.5,167.98828125L105,167.98828125L105,219.984375L54.5,219.984375L54.5,167.98828125"],["fill","rgba(0,0,255,0.3)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",57.5],["y",207.19921875],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",700],["font-style","normal"],["font-size","40px"]],"content":"33"}]}],"visibility":"visible","type":"dom"},{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",105],["y",207.19921875],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"2"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"},{"bb":[{"type":"item","tagName":"path","props":[["d","M10,233.8984375L60,233.8984375L60,335.8046875L10,335.8046875L10,233.8984375"],["fill","rgba(204,204,204,1)"]]}],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M10,304.62109375L113.40625,304.62109375L113.40625,322.49609375L10,322.49609375L10,304.62109375"],["fill","rgba(255,0,0,1)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",10],["y",319.10546875],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"22222"}]},{"bb":[{"type":"item","tagName":"path","props":[["d","M54.5,233.8984375L104.5,233.8984375L104.5,331.890625L54.5,331.890625L54.5,233.8984375"],["fill","rgba(0,0,255,0.3)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",57.5],["y",273.109375],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",700],["font-style","normal"],["font-size","40px"]],"content":"3"},{"type":"item","tagName":"text","props":[["x",57.5],["y",319.10546875],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",700],["font-style","normal"],["font-size","40px"]],"content":"3"}]}],"visibility":"visible","type":"dom"},{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",104.5],["y",319.10546875],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"2"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom","defs":[]}')
      .end();
  }
};
