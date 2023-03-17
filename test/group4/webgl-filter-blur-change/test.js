let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .pause(20)
      .assert.value('input', 'data:image/png;base64,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igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMIEPSYqDWKAALdCBB0t8TUiwACYwgQ9JioNYoAAt0IEHS3xNSLAAJjCBD0mKg1igAC3QgQdLfE1IsAAmMI/B8T+Ky0QEWFsAAAAABJRU5ErkJggg==')
      .end();
  }
};
