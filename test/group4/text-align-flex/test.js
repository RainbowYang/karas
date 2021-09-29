let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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K5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlVAoCuRAwIECGwEBHrjbpUAAQJVQKArkQMCBAhsBAR6426VAAECVUCgK5EDAgQIbAQEeuNulQABAlXgf1MZYmmBKNJ0AAAAAElFTkSuQmCC')
      .end();
  }
};
