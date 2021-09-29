let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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S4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBAR0J6ROgACBkICADsFrS4AAgU5AQHdC6gQIEAgJCOgQvLYECBDoBP4FmrcHh8GdChkAAAAASUVORK5CYII=')
      .end();
  }
};
