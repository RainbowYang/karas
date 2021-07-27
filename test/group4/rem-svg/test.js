let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .pause(20)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"img","tagName":"image","props":[["xlink:href","../../image.png"],["x",48],["y",48],["width",100],["height",100],["transform","matrix(0.8,0,0,0.8,9.599999999999994,9.599999999999994)"]]},{"type":"item","tagName":"path","props":[["d","M32.93725830020305,32.93725830020305C33.53737471123676,32.33714188916934 34.35130723251346,32 35.2,32L35.2,35.2L32,32M35.2,32L48,32L48,48L35.2,35.2M48,32L160,32L160,48L48,48M160,32L172.8,32L172.8,35.19999999999999L160,48M172.8,32C173.64869276748655,32 174.46262528876326,32.33714188916934 175.06274169979696,32.93725830020305L176,32L172.8,35.19999999999999"],["fill","rgba(255,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M175.06274169979696,32.93725830020305C175.66285811083068,33.53737471123676 176,34.35130723251346 176,35.2L172.79999999999998,35.2L176,32M172.79999999999998,35.2L176,35.2L176,48L160,48M160,48L176,48L176,160L160,160M160,160L176,160L176,172.8L172.8,172.8M176,172.8C176,173.64869276748655 175.66285811083068,174.46262528876326 175.06274169979696,175.06274169979696L176,176L172.8,172.8"],["fill","rgba(255,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M32.93725830020305,175.06274169979696C33.53737471123676,175.66285811083068 34.35130723251346,176 35.2,176L35.2,172.8L32,176M35.2,172.8L48,160L48,176L35.2,176M48,160L160,160L160,176L48,176M160,160L172.8,172.8L172.8,176L160,176M172.8,176C173.64869276748655,176 174.46262528876326,175.66285811083068 175.06274169979696,175.06274169979696L176,176L172.8,172.8"],["fill","rgba(255,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M32.93725830020305,32.93725830020305C32.33714188916934,33.53737471123676 32,34.35130723251346 32,35.2L35.2,35.2L32,32M32,35.2L35.2,35.2L48,48L32,48M32,48L48,48L48,160L32,160M32,160L48,160L35.19999999999999,172.8L32,172.8M32,172.8C32,173.64869276748655 32.33714188916934,174.46262528876326 32.93725830020305,175.06274169979696L32,176L35.19999999999999,172.8"],["fill","rgba(255,0,0,1)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",64],["y",114.5703125],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","32px"],["letter-spacing",16]],"content":"ab"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom","defs":[],"lv":0}')
      .end();
  }
};
