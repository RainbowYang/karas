let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '<svg width="360" height="360"><defs><mask id="karas-defs-0-0"><path d="M50,50L100,100L50,100L50,50" fill="rgba(255,255,255,1)" stroke-width="0" transform="matrix(1,0,0,1,0,50)"></path></mask></defs><g></g><g><g transform="matrix(1,0,0,1,50,0)" visibility="visible"><g></g><g><g visibility="visible" mask="url(#karas-defs-0-0)"><g><path d="M0,0L360,0L360,360L0,360L0,0" fill="rgba(255,0,0,1)"></path></g><g><g><text x="0" y="14.484375" fill="rgba(0,0,0,1)" font-family="arial" font-weight="400" font-style="normal" font-size="16px">123</text></g></g></g></g></g></g></svg>')
      .end();
  }
};
