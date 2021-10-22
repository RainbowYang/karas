let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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CtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAgoaDtAgACBUgEFXRqMsQgQIKCg7QABAgRKBRR0aTDGIkCAgIK2AwQIECgVUNClwRiLAAECCtoOECBAoFRAQZcGYywCBAj8B5yIOXgT2IUKAAAAAElFTkSuQmCC')
      .end();
  }
};