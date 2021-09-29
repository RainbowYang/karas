let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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QEBB2wECBAhEBRR0dDBiESBAQEHbAQIECEQFFHR0MGIRIEBAQdsBAgQIRAUUdHQwYhEgQEBB2wECBAhEBRR0dDBiESBAQEHbAQIECEQFFHR0MGIRIEBAQdsBAgQIRAUUdHQwYhEgQEBB2wECBAhEBRR0dDBiESBAQEHbAQIECEQFFHR0MGIRIEBAQdsBAgQIRAUUdHQwYhEgQEBB2wECBAhEBRR0dDBiESBAQEHbAQIECEQFFHR0MGIRIEBAQdsBAgQIRAUUdHQwYhEgQEBB2wECBAhEBRR0dDBiESBAQEHbAQIECEQFFHR0MGIRIEBAQdsBAgQIRAUUdHQwYhEgQEBB2wECBAhEBRR0dDBiESBAQEHbAQIECEQFFHR0MGIRIEBAQdsBAgQIRAUUdHQwYhEgQEBB2wECBAhEBRR0dDBiESBAQEHbAQIECEQFFHR0MGIRIEBAQdsBAgQIRAUUdHQwYhEgQEBB2wECBAhEBRR0dDBiESBAQEHbAQIECEQFFHR0MGIRIEBAQdsBAgQIRAUUdHQwYhEgQEBB2wECBAhEBRR0dDBiESBAQEHbAQIECEQFFHR0MGIRIEBAQdsBAgQIRAUUdHQwYhEgQEBB2wECBAhEBRR0dDBiESBAQEHbAQIECEQFFHR0MGIRIEBAQdsBAgQIRAUUdHQwYhEgQEBB2wECBAhEBRR0dDBiESBAQEHbAQIECEQFFHR0MGIRIEBAQdsBAgQIRAUUdHQwYhEgQEBB2wECBAhEBRR0dDBiESBAQEHbAQIECEQFFHR0MGIRIEBAQdsBAgQIRAUUdHQwYhEgQEBB2wECBAhEBRR0dDBiESBAQEHbAQIECEQFFHR0MGIRIEBAQdsBAgQIRAUUdHQwYhEgQEBB2wECBAhEBRR0dDBiESBAQEHbAQIECEQFFHR0MGIRIEBAQdsBAgQIRAUUdHQwYhEgQEBB2wECBAhEBRR0dDBiESBAQEHbAQIECEQFFHR0MGIRIEBAQdsBAgQIRAUUdHQwYhEgQEBB2wECBAhEBRR0dDBiESBAQEHbAQIECEQFFHR0MGIRIEBAQdsBAgQIRAUUdHQwYhEgQEBB2wECBAhEBRR0dDBiESBAQEHbAQIECEQFFHR0MGIRIEBAQdsBAgQIRAUUdHQwYhEgQEBB2wECBAhEBRR0dDBiESBAQEHbAQIECEQFFHR0MGIRIEBAQdsBAgQIRAUUdHQwYhEgQEBB2wECBAhEBRR0dDBiESBAQEHbAQIECEQFFHR0MGIRIEBAQdsBAgQIRAUUdHQwYhEgQEBB2wECBAhEBRR0dDBiESBAQEHbAQIECEQFFHR0MGIRIEBAQdsBAgQIRAUUdHQwYhEgQEBB2wECBAhEBRR0dDBiESBAQEHbAQIECEQFFHR0MGIRIEBAQdsBAgQIRAUUdHQwYhEgQEBB2wECBAhEBRR0dDBiESBAQEHbAQIECEQFFHR0MGIRIEBAQdsBAgQIRAUUdHQwYhEgQEBB2wECBAhEBRR0dDBiESBA4C9hUId48lskWAAAAABJRU5ErkJggg==')
      .end();
  }
};
