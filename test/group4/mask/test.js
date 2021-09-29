let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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BLQZIECAQKmAgC5tjLIIECAgoM0AAQIESgUEdGljlEWAAAEBbQYIECBQKiCgSxujLAIECAhoM0CAAIFSAQFd2hhlESBAQECbAQIECJQKCOjSxiiLAAECAtoMECBAoFRAQJc2RlkECBAQ0GaAAAECpQICurQxyiJAgICANgMECBAoFRDQpY1RFgECBAS0GSBAgECpgIAubYyyCBAgIKDNAAECBEoFBHRpY5RFgAABAW0GCBAgUCogoEsboywCBAgIaDNAgACBUgEBXdoYZREgQEBAmwECBAiUCgjo0sYoiwABAgLaDBAgQKBUQECXNkZZBAgQENBmgAABAqUCArq0McoiQICAgDYDBAgQKBUQ0KWNURYBAgQEtBkgQIBAqYCALm2MsggQICCgzQABAgRKBQR0aWOURYAAAQFtBggQIFAqIKBLG6MsAgQICGgzQIAAgVIBAV3aGGURIEBAQJsBAgQIlAoI6NLGKIsAAQIC2gwQIECgVEBAlzZGWQQIEBDQZoAAAQKlAgK6tDHKIkCAgIA2AwQIECgVENCljVEWAQIEBLQZIECAQKmAgC5tjLIIECAgoM0AAQIESgUEdGljlEWAAAEBbQYIECBQKiCgSxujLAIECAhoM0CAAIFSAQFd2hhlESBAQECbAQIECJQKCOjSxiiLAAECAtoMECBAoFRAQJc2RlkECBAQ0GaAAAECpQICurQxyiJAgICANgMECBAoFRDQpY1RFgECBAS0GSBAgECpgIAubYyyCBAgIKDNAAECBEoFBHRpY5RFgAABAW0GCBAgUCogoEsboywCBAgIaDNAgACBUgEBXdoYZREgQEBAmwECBAiUCvwPYP+Slmhy3B4AAAAASUVORK5CYII=')
      .end();
  }
};
