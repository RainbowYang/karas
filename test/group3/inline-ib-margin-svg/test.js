let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M10,10L60,10L60,62.8955078125L10,62.8955078125L10,10"],["fill","rgba(0,0,0,0.3)"]]}],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M10,22.673828125L54.5,22.673828125L54.5,40.548828125L10,40.548828125L10,22.673828125"],["fill","rgba(255,0,0,0.3)"]]},{"type":"item","tagName":"path","props":[["d","M10,44.4970703125L18.90625,44.4970703125L18.90625,62.3720703125L10,62.3720703125L10,44.4970703125"],["fill","rgba(255,0,0,0.3)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",10],["y",37.158203125],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"2"}]},{"bb":[{"type":"item","tagName":"path","props":[["d","M23.90625,10L40.59375,10L40.59375,43.515625L23.90625,43.515625L23.90625,10"],["fill","rgba(0,0,255,0.3)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",23.90625],["y",37.158203125],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",700],["font-style","normal"],["font-size","30px"]],"content":"3"}]}],"visibility":"visible","type":"dom"},{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",45.59375],["y",37.158203125],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"2"},{"type":"item","tagName":"text","props":[["x",10],["y",58.9814453125],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"2"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"},{"bb":[{"type":"item","tagName":"path","props":[["d","M10,72.8955078125L60,72.8955078125L60,139.705078125L10,139.705078125L10,72.8955078125"],["fill","rgba(0,0,0,0.3)"]]}],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M10,90.5693359375L54.5,90.5693359375L54.5,108.4443359375L10,108.4443359375L10,90.5693359375"],["fill","rgba(255,0,0,0.3)"]]},{"type":"item","tagName":"path","props":[["d","M10,121.306640625L18.90625,121.306640625L18.90625,139.181640625L10,139.181640625L10,121.306640625"],["fill","rgba(255,0,0,0.3)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",10],["y",105.0537109375],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"2"}]},{"bb":[{"type":"item","tagName":"path","props":[["d","M23.90625,77.8955078125L40.59375,77.8955078125L40.59375,112.392578125L23.90625,112.392578125L23.90625,77.8955078125"],["fill","rgba(0,0,255,0.3)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",23.90625],["y",105.0537109375],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",700],["font-style","normal"],["font-size","30px"]],"content":"3"}]}],"visibility":"visible","type":"dom"},{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",45.59375],["y",105.0537109375],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"2"},{"type":"item","tagName":"text","props":[["x",10],["y",135.791015625],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"2"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom","defs":[]}')
      .end();
  }
};
