let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoCAYAAAB65WHVAAAAAXNSR0IArs4c6QAADuRJREFUeF7t3UvI74kcx/HPGca4M1JIisW4pElKNrJwKSmSorChFCtrmXJZWFvYsxFTclc2LBSFKFlIGpqUErlfyn30M/8xY8w5z3N6nHrX83rKZp6///me1/fbu3//53Ku3LP9eNf4ePd266O3PWy751qPu2e7cjzgfdtvrvK4r1zZ3nmt5/A5AgQIELhf4IjqNcP7gW0v2fbkc6q98OqP+8KV7XXnfBoPI0CAwKUXOFeg37btmRenEuiLG3oGAgQukcCZgf7Qtjdue8bFUQT64oaegQCBSyRwZqCPN5Qfu+3mq6Dc9/7IlbPRBPpsI48gQIDAfwTODPRd25607XHbHvEQcH/f9odtjzz97xqhFmiHR4AAgesQODPQxxcJb9324m0v2PaobQ+M8PEK+6PbnrftZafPX+XPF+jrWIyHEiBA4FyBPsL8k23P2vbKbY95gNuft3172ze3vegUaYF2WAQIELi4wLkCfXwXx/EWxqe3PW3bqx/ilfI3tn1n27uuPpNX0Bffl2cgQOASCZw70Me32f18253bbtv28ge95/yjbZ/cdodAX6Lz8VclQOBGClxXoI9Bjrc6jlfSz9720tMXDv+57eunz71DoG/kvjw3AQKXSOC6A33Y3L3ti9tu2fb0bX88xfkVp/ehvQd9iS7IX5UAgRsmcGagr/aDKr/e9q1tPzu91fGcbcePed/kFfQNW5YnJkDgcgmcGeg/nV4p/2Pbw+/9pUn/8/G30+fO+GEVXyS8XLflb0uAwAUFzgz08f7yL7d9//S+8/GWxoM/vnf6UfAnegV9wXX4vxMgQOB+gTMDfbyF8YnTD6e85hTpBwN++PT543d2PNVbHO6LAAEC/xeBMwP98W1/2faGbY8//ZHHj3cfXxh8winMv9/2mdN70W8S6P/LYjwJAQIEjkD/9loMH9xuef32t+dvx7sd//64e7vpI9vN793+esvp90n/YLvps9vNd9zb84f6+NKV7S3ICRAgQOB8Akeg33Oth755e+nbtx++cvvFfY/7/Pb0j223vX/77u3b747//uXtKR/dnn3n9rWrPN9dV7ZPnW8sjyJAgACBc/yW0L11977K/sq245s5jm/kOP5llOPboH+17aundzpedfpv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')
      .end();
  }
};
