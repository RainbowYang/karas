let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"rect","props":[["x",60],["y",60],["width",240],["height",200],["fill","rgba(255,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M8.786796564403573,8.786796564403577C14.412887917844614,3.160705210962533 22.043505304813678,-3.552713678800501e-15 30,0L30,29.999999999999996L0,0M30,0L60,0L60,60L30,29.999999999999996M60,0L300,0L300,60L60,60M300,0L330,0L330,29.999999999999996L300,60M330,0C337.95649469518634,-3.552713678800501e-15 345.5871120821554,3.160705210962533 351.2132034355964,8.786796564403577L360,0L330,29.999999999999996"],["fill","rgba(0,0,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M351.2132034355964,8.786796564403577C356.83929478903747,14.41288791784461 360,22.043505304813678 360,29.999999999999996L330,30L360,0M330,30L360,30L360,60L300,60M300,60L360,60L360,260L300,260M300,260L360,260L360,290L330,290M360,290C360,297.95649469518634 356.83929478903747,305.5871120821554 351.2132034355964,311.2132034355964L360,320L330,290"],["fill","rgba(0,0,255,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M8.786796564403573,311.2132034355964C14.412887917844614,316.83929478903747 22.043505304813678,320 30,320L30,290L0,320M30,290L60,260L60,320L30,320M60,260L300,260L300,320L60,320M300,260L330,290L330,320L300,320M330,320C337.95649469518634,320 345.5871120821554,316.83929478903747 351.2132034355964,311.2132034355964L360,320L330,290"],["fill","rgba(255,0,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M8.786796564403573,8.786796564403577C3.160705210962533,14.41288791784461 -3.552713678800501e-15,22.043505304813678 0,29.999999999999996L30.000000000000004,30L0,0M0,30L30.000000000000004,30L60,60L0,60M0,60L60,60L60,260L0,260M0,260L60,260L30.000000000000004,290L0,290M0,290C-3.552713678800501e-15,297.95649469518634 3.160705210962533,305.5871120821554 8.786796564403573,311.2132034355964L0,320L30.000000000000004,290"],["fill","rgba(0,255,0,0.5)"]]}],"children":[],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom","defs":[]}')
      .end();
  }
};
