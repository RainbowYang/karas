let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '<svg width="360" height="360"><defs><clipPath id="karas-defs-0-0"><rect x="0" y="120" width="360" height="120" fill="#FFF"></rect></clipPath><clipPath id="karas-defs-0-1"><rect x="0" y="240" width="360" height="120" fill="#FFF"></rect></clipPath></defs><g></g><g><g><g><rect x="0" y="0" width="360" height="120" fill="rgba(0,0,0,1)"></rect><image xlink:href="../image.png" x="0" y="0" width="100" height="100" transform="matrix(3.6,0,0,1.2,0,0)"></image></g><g></g></g><g><g clip-path="url(#karas-defs-0-0)"><rect x="0" y="120" width="360" height="120" fill="rgba(0,255,0,1)"></rect><image xlink:href="../image.png" x="0" y="120" width="100" height="100" transform="matrix(0.5,0,0,0.8,0,24)"></image><image xlink:href="../image.png" x="50" y="120" width="100" height="100" transform="matrix(0.5,0,0,0.8,25,24)"></image><image xlink:href="../image.png" x="100" y="120" width="100" height="100" transform="matrix(0.5,0,0,0.8,50,24)"></image><image xlink:href="../image.png" x="150" y="120" width="100" height="100" transform="matrix(0.5,0,0,0.8,75,24)"></image><image xlink:href="../image.png" x="200" y="120" width="100" height="100" transform="matrix(0.5,0,0,0.8,100,24)"></image><image xlink:href="../image.png" x="250" y="120" width="100" height="100" transform="matrix(0.5,0,0,0.8,125,24)"></image><image xlink:href="../image.png" x="300" y="120" width="100" height="100" transform="matrix(0.5,0,0,0.8,150,24)"></image><image xlink:href="../image.png" x="350" y="120" width="100" height="100" transform="matrix(0.5,0,0,0.8,175,24)"></image><image xlink:href="../image.png" x="0" y="200" width="100" height="100" transform="matrix(0.5,0,0,0.8,0,40)"></image><image xlink:href="../image.png" x="50" y="200" width="100" height="100" transform="matrix(0.5,0,0,0.8,25,40)"></image><image xlink:href="../image.png" x="100" y="200" width="100" height="100" transform="matrix(0.5,0,0,0.8,50,40)"></image><image xlink:href="../image.png" x="150" y="200" width="100" height="100" transform="matrix(0.5,0,0,0.8,75,40)"></image><image xlink:href="../image.png" x="200" y="200" width="100" height="100" transform="matrix(0.5,0,0,0.8,100,40)"></image><image xlink:href="../image.png" x="250" y="200" width="100" height="100" transform="matrix(0.5,0,0,0.8,125,40)"></image><image xlink:href="../image.png" x="300" y="200" width="100" height="100" transform="matrix(0.5,0,0,0.8,150,40)"></image><image xlink:href="../image.png" x="350" y="200" width="100" height="100" transform="matrix(0.5,0,0,0.8,175,40)"></image></g><g></g></g><g><g clip-path="url(#karas-defs-0-1)"><rect x="0" y="240" width="360" height="120" fill="rgba(0,0,255,1)"></rect><image xlink:href="../image.png" x="0" y="240" width="100" height="100" transform="matrix(0.5,0,0,0.5,0,120)"></image><image xlink:href="../image.png" x="50" y="240" width="100" height="100" transform="matrix(0.5,0,0,0.5,25,120)"></image><image xlink:href="../image.png" x="100" y="240" width="100" height="100" transform="matrix(0.5,0,0,0.5,50,120)"></image><image xlink:href="../image.png" x="150" y="240" width="100" height="100" transform="matrix(0.5,0,0,0.5,75,120)"></image><image xlink:href="../image.png" x="200" y="240" width="100" height="100" transform="matrix(0.5,0,0,0.5,100,120)"></image><image xlink:href="../image.png" x="250" y="240" width="100" height="100" transform="matrix(0.5,0,0,0.5,125,120)"></image><image xlink:href="../image.png" x="300" y="240" width="100" height="100" transform="matrix(0.5,0,0,0.5,150,120)"></image><image xlink:href="../image.png" x="350" y="240" width="100" height="100" transform="matrix(0.5,0,0,0.5,175,120)"></image><image xlink:href="../image.png" x="0" y="290" width="100" height="100" transform="matrix(0.5,0,0,0.5,0,145)"></image><image xlink:href="../image.png" x="0" y="340" width="100" height="100" transform="matrix(0.5,0,0,0.5,0,170)"></image><image xlink:href="../image.png" x="50" y="290" width="100" height="100" transform="matrix(0.5,0,0,0.5,25,145)"></image><image xlink:href="../image.png" x="50" y="340" width="100" height="100" transform="matrix(0.5,0,0,0.5,25,170)"></image><image xlink:href="../image.png" x="100" y="290" width="100" height="100" transform="matrix(0.5,0,0,0.5,50,145)"></image><image xlink:href="../image.png" x="100" y="340" width="100" height="100" transform="matrix(0.5,0,0,0.5,50,170)"></image><image xlink:href="../image.png" x="150" y="290" width="100" height="100" transform="matrix(0.5,0,0,0.5,75,145)"></image><image xlink:href="../image.png" x="150" y="340" width="100" height="100" transform="matrix(0.5,0,0,0.5,75,170)"></image><image xlink:href="../image.png" x="200" y="290" width="100" height="100" transform="matrix(0.5,0,0,0.5,100,145)"></image><image xlink:href="../image.png" x="200" y="340" width="100" height="100" transform="matrix(0.5,0,0,0.5,100,170)"></image><image xlink:href="../image.png" x="250" y="290" width="100" height="100" transform="matrix(0.5,0,0,0.5,125,145)"></image><image xlink:href="../image.png" x="250" y="340" width="100" height="100" transform="matrix(0.5,0,0,0.5,125,170)"></image><image xlink:href="../image.png" x="300" y="290" width="100" height="100" transform="matrix(0.5,0,0,0.5,150,145)"></image><image xlink:href="../image.png" x="300" y="340" width="100" height="100" transform="matrix(0.5,0,0,0.5,150,170)"></image><image xlink:href="../image.png" x="350" y="290" width="100" height="100" transform="matrix(0.5,0,0,0.5,175,145)"></image><image xlink:href="../image.png" x="350" y="340" width="100" height="100" transform="matrix(0.5,0,0,0.5,175,170)"></image></g><g></g></g></g></svg>')
      .end();
  }
};
