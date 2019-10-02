var path = require('path');
var fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[],"children":[{"type":"item","tagName":"ellipse","props":[["cx",50],["cy",25],["rx",50],["ry",25],["fill","url(#karas-defs-0-0)"],["stroke","#000"],["stroke-width",1],["stroke-dasharray",[]]]}],"transform":[],"type":"geom"},{"bb":[],"children":[{"type":"item","tagName":"ellipse","props":[["cx",50],["cy",75],["rx",25],["ry",12.5],["fill","url(#karas-defs-0-1)"],["stroke","#000"],["stroke-width",1],["stroke-dasharray",[]]]}],"transform":[],"type":"geom"}],"transform":[],"type":"dom","defs":[{"tagName":"radialGradient","props":[["cx",50],["cy",25],["r",55.90169943749474]],"stop":[["#F00",0],["#00F",1]],"uuid":"karas-defs-0-0"},{"tagName":"radialGradient","props":[["cx",50],["cy",75],["r",103.07764064044152]],"stop":[["#F00",0],["#00F",1]],"uuid":"karas-defs-0-1"}]}')
      .end();
  }
};
