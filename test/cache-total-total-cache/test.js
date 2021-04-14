let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoCAYAAAB65WHVAAARe0lEQVR4Xu3dS6iu/RjH8d+KHGLiMMBLGJAyIjmNZEApA0V5UwYGDkkRCjnLKeeBkkKkMBFlYCSHgeRYBgaOA+9LlJDSm8PW/fa8tba99n7utf7retb1/O/PLjm07v/635/r6tvTtt69T+IXAQIECLQUOGl5K5ciQIAAgQi0JSBAgEBTAYFuOhjXIkCAgEDbAQIECDQVEOimg3EtAgQICLQdIECAQFMBgW46GNciQICAQNsBAgQINBUQ6KaDcS0CBAgItB0gQIBAUwGBbjoY1yJAgIBA2wECBAg0FRDopoNxLQIECAi0HSBAgEBTAYFuOhjXIkCAgEDbAQIECDQVEOimg3EtAgQICLQdIECAQFMBgW46GNciQICAQNsBAgQINBUQ6KaDcS0CBAgItB0gQIBAUwGBbjoY1yJAgIBA2wECBAg0FRDopoNxLQIECAi0HSBAgEBTAYFuOhjXIkCAgEDbAQIECDQVEOimg3EtAgQICLQdIECAQFMBgW46GNciQICAQNsBAgQINBUQ6KaDcS0CBAgItB0gQIBAUwGBbjoY1yJAgIBA2wECBAg0FRDopoNxLQIECAi0HSBAgEBTAYFuOhjXIkCAgEDbAQIECDQVEOimg3EtAgQICLQdIECAQFMBgW46GNciQICAQNsBAgQINBUQ6KaDcS0CBAgItB0gQIBAUwGBbjoY1yJAgIBA2wECBAg0FRDopoNxLQIECAi0HSBAgEBTAYFuOhjXIkCAgEDbAQIECDQVEOimg3EtAgQICLQdIECAQFMBgW46GNciQICAQNsBAgQINBUQ6KaDcS0CBAgItB0gQIBAUwGBbjoY1yJAgIBA2wECBAg0FRDopoNxLQIECAi0HSBAgEBTAYFuOhjXIkCAgEDbAQIECDQVEOimg3EtAgQICLQdIECAQFMBgW46GNciQICAQNsBAgQINBUQ6KaDcS0CBAgItB0gQIBAUwGBbjoY1yJAgIBA2wECBAg0FRDopoNxLQIECAi0HSBAgEBTAYFuOhjXIkCAgEDbAQIECDQVEOimg3EtAgQICLQdIECAQFMBgW46GNciQICAQNsBAgQINBUQ6KaDcS0CBAgItB0gQIBAUwGBbjoY1yJAgIBA2wECBAg0FRDopoNxLQIECAi0HSBAgEBTAYFuOhjXIkCAgEDbAQIECDQVEOimg3EtAgQICLQdIECAQFMBgW46GNciQICAQNsBAgQINBUQ6KaDcS0CBAgItB0gQIBAUwGBbjoY1yJAgIBA2wECBAg0FRDopoNxLQIECAi0HSBAgEBTAYFuOhjXIkCAgEDbAQIECDQVEOimg3EtAgQICLQdIECAQFMBgW46GNciQICAQNsBAgQINBUQ6KaDcS0CBAgItB0gQIBAUwGBbjoY1yJAgIBA2wECBAg0FRDopoNxLQIECAi0HSBAgEBTAYFuOhjXIkCAgEDbAQIECDQVEOimg3EtAgQICLQdIECAQFMBgW46GNciQICAQNsBAgQINBUQ6KaDcS0CBAgItB0gQIBAUwGBbjoY1yJAgIBA2wECBAg0FRDopoNxLQIECAi0HSBAgEBTAYFuOhjXIkCAgEDbAQIECDQVEOimg3EtAgQICLQdIECAQFMBgW46GNciQICAQNsBAgQINBUQ6KaDcS0CBAgItB0gQIBAUwGBbjoY1yJAgIBA2wECBAg0FRDopoNxLQIECAi0HSBAgEBTAYFuOhjXIkCAgEDbAQIECDQVEOimg3EtAgQICLQdIECAQFMBgW46GNciQICAQNsBAgQINBUQ6KaDcS0CBAgItB0gQIBAUwGBbjoY1yJAgIBA2wECBAg0FRDopoNxLQIECAi0HSBAgEBTAYFuOhjXIkCAgEDbAQIECDQVEOimg3EtAgQICLQdIECAQFMBgW46GNciQICAQNsBAgQINBUQ6KaDcS0CBAgItB0gQIBAUwGBbjoY1yJAgIBA2wECBAg0FRDopoNxLQIECAi0HSBAgEBTAYFuOhjXIkCAgEDbAQIECDQVEOimg3EtAgQICLQdIECAQFMBgW46GNciQICAQNsBAgQINBUQ6KaDcS0CBAgItB0gQIBAUwGBbjoY1yJAgIBA2wECBAg0FRDopoNxLQIECAi0HSBAgEBTAYFuOhjXIkCAgEDbAQIECDQVEOimg3EtAgQICLQdIECAQFMBgW46GNciQICAQNsBAgQINBUQ6KaDcS0CBAgItB0gQIBAUwGBbjoY1yJAgIBA24GpBK4l106/0Elix6ea8LZexvJua97Tv61ATz/iTb2gQG9q3PO/7D2BPrnuc3TJe9+Zk9xWcrJDCewEBNoqTCUg0FONc/MvI9CbX4FJAa7tfi/6sj9KP+LO5I67Pzj7BD3p6nR6LYHuNA13uTwBgb48SyddmYBAXxm9b1wqINClvA4/jIBAH8bZdzm0gEAfWtz3KxAQ6AJURzYQEOgGQ3CFUQGBHhX0fE8Bge45F7c6l4BAn4vLFx+NgEAfzahc9OYCAm075hQQ6DnnurG3EuiNDXwzr7s60P9J8o4k70vy0SSvvTWRn4PezAp1eFGB7jAFd7h8gVWB/kOS25P8Kckvk3xIoC9/Ek4cEBDoATyPNhZYFegPJ/lBks8leWiSDwh045Fu8WoCvcWpb+GdVwX690keudO4n0BvYS+O7B0F+sgG5rorBVYF+vRZAr1S1pcdUECgD4jtWx1QQKAPiO1bVQkIdJWsc69WQKCv1t93vxQBgb4URoe0ExDodiNxofMLCPT5zTxxDAICfQxTcsc9AgJtReYUEOg557qxtxLojQ18M6+7KtA/SfL3Hclzkrw8yQt3//3pSZaf7Pi/X/5Jws2sUIcXFegOU3CHyxdYFeglwss/qHLWr98meYxAX/5knHgOAYE+B5YvPSKBVYG+wPv4BH0BNI9cVECgLyrnud4CAt17Pm63SkCgVzH5oqMTEOijG5kL3ygg0LZiTgGBnnOuG3srgd7YwDfzugK9mVHP/KICPfN0t/xuAr3l6U/z7gI9zSi9yHUCAm0hJhAQ6AmG6BXOEFgV6OWvu/pEks8k+V2SRyV5WZLXJ7nX2ax+zM66HVBAoA+I7VsdUGBVoN+S5CNJ3pPkaUm+m+SdST6Y5A0CfcBx+VZnCwi0zZhTYG+g/5XkwUlevfubVO5heNHu0/QPBXrOzTiqtxLooxqXy64W2Bvo/yb5TZKHJHnQqWOX3974WpJfC/RqbF9YJSDQVbLOvVqBvYE+63r/TvLkJE9K8nmBvtoJ+u5JBNoazClwoUC/Mcmnkix/yt3jBHrOzTiqtxLooxqXy64WOHeg35Tk40m+muR5N/82fopj9Qh84biAQI8bOqGjwOpAL78X/YokX9n93vOzb/02At1x2tPeSaCnHe3GX2x1oJef4lji/M0kT9mPJtD7jXzFpQkI9KVROqiVwKpAfyHJK3c//7wizssLCnSrMc9+GYGefcJbfb+9gf5nkscneWqS15yh9Mwk97nxfxforW7Ulby3QF8Ju29aLrA30D/b/TjdzW7yhyQPE+jyQfkGtxIQaPsxp8DeQF/wtX2CviCcxy4iINAXUfNMfwGB7j8jN9wrINB7iXzBUQoI9FGOzaWvFxBoGzGngEDPOdeNvZVAb2zgm3ldgd7MqGd+UYGeebpbfjeB3vL0p3l3gZ5mlF7kOoFVgV5+Fnr5A/q/nOSPSR6++wdXlj+s/95ng/opDot2QAGBPiC2b3VAgVWBvj3Jt5K8f/en130vydt20V7+/YxfAn3AIfpWAm0H5hTYG+i/Jnns7u8kfOkpg+VvVPlVkp8K9JybcVRvJdBHNS6XXS2wN9A3O2n5VL0E2l95tdraF5YJCHQZrYOvVOBcgV5+L/pvSb6e5HVJPpvkxT5BX+kAffNFQKDtwZwC5wr0s5J8Z/d3E34yyfIp+ia//B70nPvS9K0EuulgXGtQ4FyB/nmS5Q9HWv4Pw4/t/maVV/kEPTgCj48LCPS4oRM6Cpwr0Kdf4L1Jln/9OckDbnwzn6A7TnvaOwn0tKPd+IvtDfQdu0/ML0jywFNY30jy/CS/SPIEgd74Gl316wv0VU/A968R2BvoH+/+iqsvJnnJqTu8O8m7kvwjyf0FumY6Tl0pINAroXzZkQnsDfTyPs9N8qPdb2k8cfef37oL9qf9HvSRjXzG6wr0jFP1TsmqQC+fkt+e5EtJ/pLk0bsfr3vz2Z+eF1e/B227Digg0AfE9q0OKLAq0Be4j0BfAM0jFxUQ6IvKea63gED3no/brRIQ6FVMvujoBAT66EbmwjcKCLStmFNAoOec68beSqA3NvDNvK5Ab2bUM7+oQM883S2/m0BvefrTvLtATzNKL3KdgEBbiAkEBHqCIXqFMwQE2lpMICDQEwzRKwi0HZhTQKDnnKu38gnaDkwgINATDNEr3OIT9LeXP4z/En/d967kGd9fDrwzJ7ntEk92FIEbBATaUswpcM8n6Lq3E+g6WyfvBATaKswpcC2X/NH5Bqa7cpK7P0r7RaBKQKCrZJ1LgACBQQGBHgT0OAECBKoEBLpK1rkECBAYFBDoQUCPEyBAoEpAoKtknUuAAIFBAYEeBPQ4AQIEqgQEukrWuQQIEBgUEOhBQI8TIECgSkCgq2SdS4AAgUEBgR4E9DgBAgSqBAS6Sta5BAgQGBQQ6EFAjxMgQKBKQKCrZJ1LgACBQQGBHgT0OAECBKoEBLpK1rkECBAYFBDoQUCPEyBAoEpAoKtknUuAAIFBAYEeBPQ4AQIEqgQEukrWuQQIEBgUEOhBQI8TIECgSkCgq2SdS4AAgUEBgR4E9DgBAgSqBAS6Sta5BAgQGBQQ6EFAjxMgQKBKQKCrZJ1LgACBQQGBHgT0OAECBKoEBLpK1rkECBAYFBDoQUCPEyBAoEpAoKtknUuAAIFBAYEeBPQ4AQIEqgQEukrWuQQIEBgUEOhBQI8TIECgSkCgq2SdS4AAgUEBgR4E9DgBAgSqBAS6Sta5BAgQGBQQ6EFAjxMgQKBKQKCrZJ1LgACBQQGBHgT0OAECBKoEBLpK1rkECBAYFBDoQUCPEyBAoEpAoKtknUuAAIFBAYEeBPQ4AQIEqgQEukrWuQQIEBgUEOhBQI8TIECgSkCgq2SdS4AAgUEBgR4E9DgBAgSqBAS6Sta5BAgQGBQQ6EFAjxMgQKBKQKCrZJ1LgACBQQGBHgT0OAECBKoEBLpK1rkECBAYFBDoQUCPEyBAoEpAoKtknUuAAIFBAYEeBPQ4AQIEqgQEukrWuQQIEBgUEOhBQI8TIECgSkCgq2SdS4AAgUEBgR4E9DgBAgSqBAS6Sta5BAgQGBQQ6EFAjxMgQKBKQKCrZJ1LgACBQQGBHgT0OAECBKoEBLpK1rkECBAYFBDoQUCPEyBAoEpAoKtknUuAAIFBAYEeBPQ4AQIEqgQEukrWuQQIEBgUEOhBQI8TIECgSkCgq2SdS4AAgUEBgR4E9DgBAgSqBAS6Sta5BAgQGBQQ6EFAjxMgQKBKQKCrZJ1LgACBQQGBHgT0OAECBKoEBLpK1rkECBAYFBDoQUCPEyBAoEpAoKtknUuAAIFBAYEeBPQ4AQIEqgQEukrWuQQIEBgUEOhBQI8TIECgSkCgq2SdS4AAgUEBgR4E9DgBAgSqBAS6Sta5BAgQGBQQ6EFAjxMgQKBKQKCrZJ1LgACBQQGBHgT0OAECBKoEBLpK1rkECBAYFBDoQUCPEyBAoEpAoKtknUuAAIFBAYEeBPQ4AQIEqgQEukrWuQQIEBgUEOhBQI8TIECgSkCgq2SdS4AAgUEBgR4E9DgBAgSqBAS6Sta5BAgQGBQQ6EFAjxMgQKBKQKCrZJ1LgACBQQGBHgT0OAECBKoEBLpK1rkECBAYFBDoQUCPEyBAoEpAoKtknUuAAIFBAYEeBPQ4AQIEqgQEukrWuQQIEBgUEOhBQI8TIECgSkCgq2SdS4AAgUEBgR4E9DgBAgSqBP4HqEINh0JK4U0AAAAASUVORK5CYII=')
      .end();
  }
};
