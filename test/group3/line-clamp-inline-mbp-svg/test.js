let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '<defs></defs><g></g><g><g visibility="visible"><g></g><g><g><text x="28.90625" y="42.8828125" fill="rgba(0,0,0,1)" font-family="arial" font-weight="400" font-style="normal" font-size="16px">…</text></g><g visibility="visible"><g></g><g><g><text x="10" y="24.484375" fill="rgba(0,0,0,1)" font-family="arial" font-weight="400" font-style="normal" font-size="16px">2222</text><text x="10" y="42.8828125" fill="rgba(0,0,0,1)" font-family="arial" font-weight="400" font-style="normal" font-size="16px">2</text></g></g></g></g></g><g visibility="visible"><g></g><g><g><text x="28.90625" y="111.9921875" fill="rgba(0,0,0,1)" font-family="arial" font-weight="400" font-style="normal" font-size="16px">…</text></g><g visibility="visible"><g></g><g><g><text x="20" y="75.1953125" fill="rgba(0,0,0,1)" font-family="arial" font-weight="400" font-style="normal" font-size="16px">222</text><text x="10" y="93.59375" fill="rgba(0,0,0,1)" font-family="arial" font-weight="400" font-style="normal" font-size="16px">2222</text><text x="10" y="111.9921875" fill="rgba(0,0,0,1)" font-family="arial" font-weight="400" font-style="normal" font-size="16px">2</text></g></g></g></g></g></g>')
      .end();
  }
};
