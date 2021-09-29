let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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SICANmKiCAEEELAvQEDbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC9AQNs3Z0YEEEDASICANmKiCAEEELAvQEDbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC9AQNs3Z0YEEEDASICANmKiCAEEELAvQEAkWxEgAAAFWElEQVTbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC9AQNs3Z0YEEEDASICANmKiCAEEELAvQEDbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC9AQNs3Z0YEEEDASICANmKiCAEEELAvQEDbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC9AQNs3Z0YEEEDASICANmKiCAEEELAvQEDbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC9AQNs3Z0YEEEDASICANmKiCAEEELAvQEDbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC9AQNs3Z0YEEEDASICANmKiCAEEELAvQEDbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC9AQNs3Z0YEEEDASICANmKiCAEEELAvQEDbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC9AQNs3Z0YEEEDASICANmKiCAEEELAvQEDbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC9AQNs3Z0YEEEDASICANmKiCAEEELAvQEDbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC9AQNs3Z0YEEEDASICANmKiCAEEELAvQEDbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC9AQNs3Z0YEEEDASICANmKiCAEEELAvQEDbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC9AQNs3Z0YEEEDASICANmKiCAEEELAvQEDbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC9AQNs3Z0YEEEDASICANmKiCAEEELAvQEDbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC9AQNs3Z0YEEEDASICANmKiCAEEELAvQEDbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC9AQNs3Z0YEEEDASICANmKiCAEEELAvQEDbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC9AQNs3Z0YEEEDASICANmKiCAEEELAvQEDbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC9AQNs3Z0YEEEDASICANmKiCAEEELAvQEDbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC9AQNs3Z0YEEEDASICANmKiCAEEELAvQEDbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC9AQNs3Z0YEEEDASICANmKiCAEEELAvQEDbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC9AQNs3Z0YEEEDASICANmKiCAEEELAvQEDbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC9AQNs3Z0YEEEDASICANmKiCAEEELAvQEDbN2dGBBBAwEiAgDZioggBBBCwL0BA2zdnRgQQQMBIgIA2YqIIAQQQsC/w/+6fyx0u1A1JAAAAAElFTkSuQmCC')
      .end();
  }
};
