let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoCAYAAAB65WHVAAANWElEQVR4Xu3cK6jtBRqH4Z+3YDEKBwxesIsg08xGsUxTxGJTvOBBELSI4AwMiDAarAbNBoNRVET7WAQNBi91EOTI2mwW58A5da03PKvt9P94vo+Xxdpr79vmRYAAAQJFgWu3FacyEwECBAjshkDfse2tba9ve2nbfwARIECAwNkEjoG+su3jbfdue3jbqwJ9tqV4MAECBA4Cx0C/su0f257d9uu2qwLtQggQIHBWgWOg79v28+Uo/xfosy7FwwkQIHDDO+jrOQTacRAgQOD8Ajf9FodAn38xJiBAgIBAuwECBAhEBQQ6uhhjESBAQKDdAAECBKICAh1djLEIECBwDPSj2+659Ph824fbPr38+atth18cehEgQIDA6QSOgT5E+PCHKjd7PbDtx9PN5EkECBAgcP1fEtIgQIAAgZaA/2bX2odpCBAgcBQQaMdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQLHQN+x7YVtz227f9tP2z7a9u9tf3EiQIAAgZMLHAP99raX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')
      .end();
  }
};