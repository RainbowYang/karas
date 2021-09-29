let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoCAYAAAB65WHVAAAAAXNSR0IArs4c6QAAECNJREFUeF7t3VuI7WUZx/GfpSGRHQzTMDpAoaWFHSCCEqIQCroogg5EZIFiEaWUWhgRKVEUREWWkOFVJFEpEXYgiMoyyptABEmzg0TkRecDSvHGOzAX0qzlfh1/2/XxJrS1//PM53n4Mqw9s/cx8Q8BAgQIVAocUzmVoQgQIEAgAu0ICBAgUCog0KWLMRYBAgQE2g0QIECgVECgSxdjrCMSeEKSjyd5WZITk/wmyWeSfGrfUzd5zQuSfCTJc5Mcn+SWJO9P8t0jms4vJrChgEBvCOVlR5XAN5KcnuStSX6f5MVJrkry2iRfn5/JQa8ZQf5tkh8n+UCSfyc5P8nbkpyW5HdHlYhhj0oBgT4q12boAwSenuTeJHfse93Pk9yU5O3zvx30muNm5O9Kcvf8NSck+XOS1yW51hYIPNACAv1AC3v+gyFwSpJLk7w0yUlJHjbf6vhqktfPgTZ5zfOTvCfJWUkem/zvu55OTnJBks89GJ+Yj7lbAgK9W/vehc92fOX7syTHJnlXkluT3JPkuvkV9Qj0Jq95xnzO95JcnmR8JT1CP972EOhduKSCz1GgC5ZghKUC4/3mHyQ5e/7v3sNvT/LT+RX0Jq+5LMn7kjw+yT/nQ56c5E6BXrovD/s/AgLtPB5qAi9P8p0kZ8zvuhif34uS3DjfNx7vH2/ymvFV83lJxnd77P0zvoPjivk+9pUPNTifT5+AQPftxERHJjDec/51kmuSfCjJs+e3yv1xvn98TpL/bPCaFya5fn4nyA1JXp1k/NoR+68luXj+huGRTetXE/AVtBvYMYHxPvP4/uXxG3rj/eh3JDk1yZfn90SfOd/qOOg1H0ty7nzP+pvzrY0Lk1yS5Or53B2j9ekepoCvoA9T28ciQIDAFgICvQWWlxIgQOAwBQT6MLV9LAIECGwhINBbYHkpAQIEDlNAoA9T28ciQIDAFgICvQWWlxIgQOAwBQT6MLV9LAIECGwhsD/QD5/f2D9+WuqiJJ/c4jleSoAAAQKLBfYC/cQkX5o/1jr+kJj3CvRiaY8jQIDAlgJ7gR5/pOL40dbxU1PjR2LHH9XoK+gtMb2cAAECKwX2Av2k+ccojmePP7lLoFcqexYBAgTuh8B9/SahQN8PSL+EAAECqwUEerWo5xEgQGCRgEAvgvQYAgQIrBYQ6NWinkeAAIFFAgK9CNJjCBAgsFpAoFeLeh4BAgQWCewF+nlJHj2f+e0kVyX5yvz3n+z7SzMXfViPIUCAAIGDBPYCPSI8flDlvv55WpJfHfQg/z8BAgQIrBXwhyWt9fQ0AgQILBMQ6GWUHkSAAIG1AgK91tPTCBAgsExAoJdRehABAgTWCgj0Wk9PI0CAwDIBgV5G6UEECBBYKyDQaz09jQABAssEBHoZpQcRIEBgrYBAr/X0NAIECCwTGIH+S5J/JbkxyYVJfjmfPv4S2Q8meWOSU5PcneS6JBcn+dsWr1k2rAcRIEBglwRGoE9PckKSjyY5MclZE2D8PYVXJHlzkpuTPDXJF+ef0fHuLV6zS54+VwIECCwT2P8Wx6uSXJ/k5CR/SHJKkpOS/GLfR/tEklckedb8b5u8ZtmwHkSAAIFdEhiBvj3JI5M8Isnjkjwzya1Jjk1yUZLXzLc4jkvyqCR/nfEeTpu8Zpc8fa4ECBBYJjACfVqSPyV5SZJr9wX6yiRvSnJBkh8l+UeSS5K8YV+gN3nNsmE9iAABArsksP8tjvFe8zUz0Lcl+XuSy5N8eB/I1UleOQM9fhPxoNfskqXPlQABAksF9gf6W0nOme8vj+/kGF8xvzPJZ+dHHL+ReEeSe+f71OMtkYNes3RYDyNAgMAuCYxAPyXJpUmOT/KW+V0b429T+WGSe+ZbGuO9508nuXP++5nz2/Fu2uA14xn+IUCAAIEtBUag70ry+flWxg1Jzk5ybpJbknwhyRnzb1S5LMkI8vfnd3c8J8ljNniNv41ly6V4OQECBIaAnyR0BwQIECgVEOjSxRiLAAECAu0GCBAgUCog0KWLMRYBAgQE2g0QIECgVECgSxdjLAIECAi0GyBAgECpgECXLsZYBAgQEGg3QIAAgVIBgS5djLEIECAg0G6AAAECpQICXboYYxEgQECg3QABAgRKBQS6dDHGIkCAgEC7AQIECJQKCHTpYoxFgAABgXYDBAgQKBUQ6NLFGIsAAQIC7QYIECBQKiDQpYsxFgECBATaDRAgQKBUQKBLF2MsAgQICLQbIECAQKmAQJcuxlgECBAQaDdAgACBUgGBLl2MsQgQICDQboAAAQKlAgJduhhjESBAQKDdAAECBEoFBLp0McYiQICAQLsBAgQIlAoIdOlijEWAAAGBdgMECBAoFRDo0sUYiwABAgLtBggQIFAqINClizEWAQIEBNoNECBAoFRAoEsXYywCBAgItBsgQIBAqYBAly7GWAQIEBBoN0CAAIFSAYEuXYyxCBAgINBugAABAqUCAl26GGMRIEBAoN0AAQIESgUEunQxxiJAgIBAuwECBAiUCgh06WKMRYAAAYF2AwQIECgVEOjSxRiLAAECAu0GCBAgUCog0KWLMRYBAgQE2g0QIECgVECgSxdjLAIECAi0GyBAgECpgECXLsZYBAgQEGg3QIAAgVIBgS5djLEIECAg0G6AAAECpQICXboYYxEgQECg3QABAgRKBQS6dDHGIkCAgEC7AQIECJQKCHTpYoxFgAABgXYDBAgQKBUQ6NLFGIsAAQIC7QYIECBQKiDQpYsxFgECBATaDRAgQKBUQKBLF2MsAgQICLQbIECAQKmAQJcuxlgECBAQaDdAgACBUgGBLl2MsQgQICDQboAAAQKlAgJduhhjESBAQKDdAAECBEoFBLp0McYiQICAQLsBAgQIlAoIdOlijEWAAAGBdgMECBAoFRDo0sUYiwABAgLtBggQIFAqINClizEWAQIEBNoNECBAoFRAoEsXYywCBAgItBsgQIBAqYBAly7GWAQIEBBoN0CAAIFSAYEuXYyxCBAgINBugAABAqUCAl26GGMRIEBAoN0AAQIESgUEunQxxiJAgIBAuwECBAiUCgh06WKMRYAAAYF2AwQIECgVEOjSxRiLAAECAu0GCBAgUCog0KWLMRYBAgQE2g0QIECgVECgSxdjLAIECAi0GyBAgECpgECXLsZYBAgQEGg3QIAAgVIBgS5djLEIECAg0G6AAAECpQICXboYYxEgQECg3QABAgRKBQS6dDHGIkCAgEC7AQIECJQKCHTpYoxFgAABgXYDBAgQKBUQ6NLFGIsAAQIC7QYIECBQKiDQpYsxFgECBATaDRAgQKBUQKBLF2MsAgQICLQbIECAQKmAQJcuxlgECBAQaDdAgACBUgGBLl2MsQgQICDQboAAAQKlAgJduhhjESBAQKDdAAECBEoFBLp0McYiQICAQLsBAgQIlAoIdOlijEWAAAGBdgMECBAoFRDo0sUYiwABAgLtBggQIFAqINClizEWAQIEBNoNECBAoFRAoEsXYywCBAgItBsgQIBAqYBAly7GWAQIEBBoN0CAAIFSAYEuXYyxCBAgINBugAABAqUCAl26GGMRIEBAoN0AAQIESgUEunQxxiJAgIBAuwECBAiUCgh06WKMRYAAAYF2AwQIECgVEOjSxRiLAAECAu0GCBAgUCog0KWLMRYBAgQE2g0QIECgVECgSxdjLAIECAi0GyBAgECpgECXLsZYBAgQEGg3QIAAgVIBgS5djLEIECAg0G6AAAECpQICXboYYxEgQECg3QABAgRKBQS6dDHGIkCAgEC7AQIECJQKCHTpYoxFgAABgXYDBAgQKBUQ6NLFGIsAAQIC7QYIECBQKiDQpYsxFgECBATaDRAgQKBUQKBLF2MsAgQICLQbIECAQKmAQJcuxlgECBAQaDdAgACBUgGBLl2MsQgQICDQboAAAQKlAgJduhhjESBAQKDdAAECBEoFBLp0McYiQICAQLsBAgQIlAoIdOlijEWAAAGBdgMECBAoFRDo0sUYiwABAgLtBggQIFAqINClizEWAQIEBNoNECBAoFRAoEsXYywCBAgItBsgQIBAqYBAly7GWAQIEBBoN0CAAIFSAYEuXYyxCBAgINBugAABAqUCAl26GGMRIEBAoN0AAQIESgUEunQxxiJAgIBAuwECBAiUCgh06WKMRYAAAYF2AwQIECgVEOjSxRiLAAECAu0GCBAgUCog0KWLMRYBAgQE2g0QIECgVECgSxdjLAIECAi0GyBAgECpgECXLsZYBAgQEGg3QIAAgVIBgS5djLEIECAg0G6AAAECpQICXboYYxEgQECg3QABAgRKBQS6dDHGIkCAgEC7AQIECJQKCHTpYoxFgAABgXYDBAgQKBUQ6NLFGIsAAQIC7QYIECBQKiDQpYsxFgECBATaDRAgQKBUQKBLF2MsAgQICLQbIECAQKmAQJcuxlgECBAQaDdAgACBUgGBLl2MsQgQICDQboAAAQKlAgJduhhjESBAQKDdAAECBEoFBLp0McYiQICAQLsBAgQIlAoIdOlijEWAAAGBdgMECBAoFRDo0sUYiwABAgLtBggQIFAqINClizEWAQIEBNoNECBAoFRAoEsXYywCBAgItBsgQIBAqYBAly7GWAQIEBBoN0CAAIFSAYEuXYyxCBAgINBugAABAqUCAl26GGMRIEBAoN0AAQIESgUEunQxxiJAgIBAuwECBAiUCgh06WKMRYAAAYF2AwQIECgVEOjSxRiLAAECAu0GCBAgUCog0KWLMRYBAgQE2g0QIECgVECgSxdjLAIECAi0GyBAgECpgECXLsZYBAgQEGg3QIAAgVIBgS5djLEIECAg0G6AAAECpQICXboYYxEgQECg3QABAgRKBQS6dDHGIkCAgEC7AQIECJQKCHTpYoxFgAABgXYDBAgQKBUQ6NLFGIsAAQIC7QYIECBQKiDQpYsxFgECBATaDRAgQKBUQKBLF2MsAgQICLQbIECAQKmAQJcuxlgECBAQaDdAgACBUgGBLl2MsQgQICDQboAAAQKlAgJduhhjESBAQKDdAAECBEoFBLp0McYiQICAQLsBAgQIlAoIdOlijEWAAAGBdgMECBAoFRDo0sUYiwABAgLtBggQIFAqINClizEWAQIEBNoNECBAoFRAoEsXYywCBAgItBsgQIBAqYBAly7GWAQIEBBoN0CAAIFSAYEuXYyxCBAgINBugAABAqUCAl26GGMRIEBAoN0AAQIESgUEunQxxiJAgIBAuwECBAiUCgh06WKMRYAAAYF2AwQIECgVEOjSxRiLAAECAu0GCBAgUCog0KWLMRYBAgQE2g0QIECgVECgSxdjLAIECAi0GyBAgECpgECXLsZYBAgQEGg3QIAAgVIBgS5djLEIECAg0G6AAAECpQICXboYYxEgQECg3QABAgRKBQS6dDHGIkCAgEC7AQIECJQKCHTpYoxFgAABgXYDBAgQKBUQ6NLFGIsAAQIC7QYIECBQKiDQpYsxFgECBATaDRAgQKBU4L/OMd1pYNAM4gAAAABJRU5ErkJggg==')
      .end();
  }
};
