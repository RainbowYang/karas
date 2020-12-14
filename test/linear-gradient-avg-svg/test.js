let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"rect","props":[["x",0],["y",0],["width",360],["height",50],["fill","url(#karas-defs-0-0)"]]}],"children":[],"visibility":"visible","type":"dom"},{"bb":[{"type":"item","tagName":"rect","props":[["x",0],["y",55],["width",360],["height",50],["fill","url(#karas-defs-0-1)"]]}],"children":[],"visibility":"visible","type":"dom"},{"bb":[{"type":"item","tagName":"rect","props":[["x",0],["y",110],["width",360],["height",50],["fill","url(#karas-defs-0-2)"]]}],"children":[],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom","defs":[{"tagName":"linearGradient","props":[["x1",180],["y1",0],["x2",180],["y2",50]],"children":[{"tagName":"stop","props":[["stop-color","rgba(0,255,0,1)"],["offset","0%"]]},{"tagName":"stop","props":[["stop-color","rgba(0,0,255,1)"],["offset","100%"]]}],"uuid":"karas-defs-0-0"},{"tagName":"linearGradient","props":[["x1",180],["y1",55],["x2",180],["y2",105]],"children":[{"tagName":"stop","props":[["stop-color","rgba(0,255,0,1)"],["offset","0%"]]},{"tagName":"stop","props":[["stop-color","rgba(0,0,0,1)"],["offset","50%"]]},{"tagName":"stop","props":[["stop-color","rgba(0,0,255,1)"],["offset","100%"]]}],"uuid":"karas-defs-0-1"},{"tagName":"linearGradient","props":[["x1",180],["y1",110],["x2",180],["y2",160]],"children":[{"tagName":"stop","props":[["stop-color","rgba(0,255,0,1)"],["offset","0%"]]},{"tagName":"stop","props":[["stop-color","rgba(0,0,0,1)"],["offset","33.33333333333333%"]]},{"tagName":"stop","props":[["stop-color","rgba(255,0,0,1)"],["offset","66.66666666666666%"]]},{"tagName":"stop","props":[["stop-color","rgba(0,0,255,1)"],["offset","100%"]]}],"uuid":"karas-defs-0-2"}]}')
      .end();
  }
};
