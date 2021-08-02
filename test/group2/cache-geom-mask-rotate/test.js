let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoCAYAAAB65WHVAAAN2UlEQVR4Xu3bS25TQRRF0fIsoYWYWXowSyNLQUKIT168Zd9XWbTj42JVabeSy/KPAAECBEYKXEaeyqEIECBAYAm0R0CAAIGhAgI99GIciwABAgLtDRAgQGCogEAPvRjHIkCAgEB7AwQIEBgqINBDL8axCBAgINDeAAECBIYKCPTQi3EsAgQICLQ3QIAAgaECAj30YhyLAAECAu0NECBAYKiAQA+9GMciQICAQHsDBAgQGCog0EMvxrEIECAg0N4AAQIEhgoI9NCLcSwCBAgItDdAgACBoQICPfRiHIsAAQIC7Q0QIEBgqIBAD70YxyJAgIBAewMECBAYKiDQQy/GsQgQICDQ3gABAgSGCgj00ItxLAIECAi0N0CAAIGhAgI99GIciwABAgLtDRAgQGCogEAPvRjHIkCAgEB7AwQIEBgqINBDL8axCBAgINDeAAECBIYKCPTQi3EsAgQICLQ3QIAAgaECAj30YhyLAAECAu0NECBAYKiAQA+9GMciQICAQHsDBAgQGCog0EMvxrEIECAg0N4AAQIEhgoI9NCLcSwCBAgItDdAgACBoQICPfRiHIsAAQIC7Q0QIEBgqIBAD70YxyJAgIBAewMECBAYKiDQQy/GsQgQILBtoK9rvay1rpe1vrpmAgQInFFgy0C/xvnL64W8iPQZn6YzEyCwXaB/i/PPGxZpb50AgdMJbBXov8RZpE/3LB2YAIGbwDaB/k+cRdp7J0DgdAJbBPqNcRbp0z1PBybwsQVOH+iDcRbpj/3e/e8JnEpgh0B/Wmt9O6j++bLW94Of8eMECBB4qMDpA33Tuq51JNLi/NAn5ssIEHivwBaBPhBpcX7vS/E5AgQeLrBNoN8QaXF++PPyhQQI3COwVaD/EWlxvueV+CwBAk8R2C7Qf4i0OD/laflSAgTuFdgy0L9E+vaXOH5b495X4vMECDxFYNtAP0XTlxIgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESgGBLjVtESBAIBQQ6BDTFAECBEoBgS41bREgQCAUEOgQ0xQBAgRKAYEuNW0RIEAgFBDoENMUAQIESoEfwikqaU1em0gAAAAASUVORK5CYII=')
      .end();
  }
};