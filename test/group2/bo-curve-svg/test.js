let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M185.04725897920605,147.82608695652175L185.42533081285444,143.47826086956522L186.18147448015122,139.1304347826087L187.31568998109643,134.78260869565216L188.82797731568996,130.43478260869566L190.71833648393192,126.08695652173913L192.9867674858223,121.73913043478262L195.63327032136107,117.3913043478261L198.6578449905482,113.04347826086956L200,111.32850241545894L200,188.67149758454107L198.6578449905482,186.95652173913044L195.6332703213611,182.6086956521739L192.98676748582233,178.2608695652174L190.71833648393192,173.91304347826085L188.82797731569,169.56521739130434L187.3156899810964,165.2173913043478L186.18147448015122,160.8695652173913L185.42533081285447,156.5217391304348L185.04725897920605,152.17391304347825L185.04725897920605,147.82608695652175"],["fill","rgba(255,0,0,1)"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"}],"visibility":"visible","type":"dom","defs":[]}')
      .end();
  }
};
