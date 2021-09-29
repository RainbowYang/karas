let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoCAYAAAB65WHVAAAAAXNSR0IArs4c6QAAEo9JREFUeF7t3XmMpWlVBvCnUEFUVomRoGxBtiC4EETQMAHEsBPCEkAx0aAGRDBgBAGXmLAvagJC2AKIAiHshF1GXIgKQhASUEDc2IwiGkYdhDKn+i1yU2mY6U439dS9v++fnu66Vfd8v3Pmqa/e+96v9vaT/TgIECBAoE5gT0DX9URBBAgQOBD4SkB/KcmvJ3l8kqcneTggAgQIEDhWgYOA/lSS+yX5bJK/S/IUAX2sTTlJT35hLjhJ5aqVwNcUuCAXVgkdBPRTk/xFkhcmuVqSJwroqiY1F7PnJYzm9qjtDAX2s3eGn3F+H34Q0P+c5LvW83yzgD6/4lv21QX0ljV0x0+nMqA3eyKgd3xCz/D0L31Az89m88rGY8/wGc7k4R9M8r1J/iTJj5zJJ3osgQMBAW0Qtkrg5Af0h5LcOckntqovTubsBAT02bn5rFKBkx/QL07yawK6dL6+3mUJ6K+3uOc7rwKnAnr2/zwyyTuS/HuS707yC0l+ceO5Z4lj/u3zSV6S5L+T3CHJ85J8+3rc/PdvJ/l4km9Jcpskv7PxCsm8WvKIJG9L8oUk10/yK0l+Yn3+0SWOu6x/f8NGHb+f5CeT/FeSeXn8Nzc+9oy1DPPXSR6d5L1JLk5y+yTzsWudV0tf/PgFBPTx90AF51DgVEBPEH44yQuSfGeSP03ys0lemeQe69kmoCd05+8PXCH8oCQ/nuQVa914Avk5SW6b5N+S/HKSLyb58xWUN0tyuSS/m+TqSV66Ava1Se6W5EwD+jIriF+dZEL525L8a5KbJLl1kicl+d/1TeGT6+vP8zu2VUBAb2tnd/S8TgX0R5N8Q5LrbCj8YJIfSvKsjYC+bpK/3HjMr66r2P9I8qIVhHOF/U3rMZ9J8g9JbpFkQnjC/X1Jvm/ja8yLgZdfV9VnGtATyI9K8rKNJY65cv699fcrr+f5pyTXTjLLIQ/Y0U7vxmlXBvRcO/zn8p8fOufa517r77dMMjs7HAROJ3AqoD+9Nme+c12Bfnktddxzhd985lxB/1SSp218mdevK98PJLlskh9IctMkP53kx1YoHj581olnSWKWNjb3qs7OkLmSnivfcxHQc/X+jUneeuR0v2d9g5i3cTm2VaAyoCeE540qpzv+/sj/JtvaGOd1dgJ7B2u0N0/yf2u9+IYr4O6+rqjn6vQwoGdNeoL28PijJLdL8u4kM4UT1E9O8qYV8HMFPssZcwU9QfwHa717s9bHrfe+/s85Cug5l7lKP7yKP3yuOc/7J5k1bMe2ClQG9LZiO6/zL7B3sOf4R5O8a/15+JyznDHBuhnQP7PWdQ8f87okE+R/s9Z9D/997gwz69iPSfKRJPPi4NwlZsL7oiNX0A9bzzHLIUevoO96sLM12XyR8LnrZ8R5kfB0SxzzDWO+2cxa+NHjCkmucf5RPcOxCQjoY6P3xOdDYO9gR8UsR8x+4huvp5gr4lsluU+Sl29cQd8gyZ9tlHF49fu5dfU8SyM/vPHxWTKZJYfZozxX1/NC4HuSzPr24THfBL5jhfDRgJ714lnDnrA/PGYnyTPXLo7DgP7D9bh5zKxBz3r4fN7mVfTfJrleknlh0bGtAgJ6Wzu7o+e1d7DF7pprfXnuhzhXwxNys+Y8V7WzljsBOn+fdeYHr6WCj60/ZxfHLBvMdrcJznmB7vvXqyLzb+9fOz7mqvpwF8dc3c7WvNmWN3eOefsK8qMBPfdlnFr+ar3D8C1rq9889+EV9OzUmGWX+RpzHnPMuxHn6nt2kXzr+iYztcxPC7MU49hWAQG9rZ3d0fM69SLhLGNMEE4gzxruBO2/JLnv2hM9wXmldUPbeVVj1pJnzfhOSWbJYXZLzLLCBPx8bLa0zePnKvwJSW60dGep45fWjo3ZRz3b4SZcZ5lkjqMBPcsh85L3G9cuk/lmMDtB5sp+dotcMck/rq1+s/d6dnRMEM/+59lfPT8JzAuG8zzzFvU77miXd+e0GwO66/56uzMLW3Gme9mfzcsOAlshsJ+9P246Eb9RpakbJ7CWS/9W7xN4ckreOYHGK2i/k3DnxvDcnbCAPneWvtLxC1QG9Lz8Mnc8eP56vXzupDBvFZi7Hsz7wxwEvpqAgDYb2yRQGdDzhtt5f9dvrTfnzo7W31g7VucWOA4CAtoM7IJAXUBfnOxfNclD1oalwybce11NzwYlBwEBbQZ2QaAuoL+U7M8Go9lVepWNDszyxmuSzI5RBwEBbQZ2QaAuoOd3Eh6Fnx2pc9uaebvAvKfKQUBAm4FdEDgRAT3vn3r2ukPu3MPLQUBAm4FdEKgP6Hkv1fxOi1et93ntQlOc49kL2MVx9nY+s0+gNqDnNjU/t+46MGvPc4saB4FLEhDQlyTk4ydJoDagZxfH3HfszetuCicJVa3HJyCgj8/eM597gcqAnl/k8/Prjr5zqxsHgUsrIKAvrZTHnQSBuoC+KNmf3408d9V96GkE535ic5NIB4HTCQhoc7FNAnUB/b5kf7bTfbXjU+v3NG9TE5zLuRMQ0OfO0lc6foG6gD7dPujjZ1IBAQIECLjdqBkgQIBAqYCALm2MsggQIDABPb+Z00GAAAECZQJ7ZfUohwABAgSWgIA2CgQIECgVENCljVEWAQIEBLQZIECAQKmAgC5tjLIIECAgoM0AAQIESgUEdGljlEWAAAEBbQYIECBQKiCgSxujLAIECAhoM0CAAIFSAQFd2hhlESBAQECbAQIECJQKCOjSxiiLAAECAtoMECBAoFRAQJc2RlkECBAQ0GaAAAECpQICurQxyiJAgICANgMECBAoFRDQpY1RFgECBAS0GSBAgECpgIAubYyyCBAgIKDNAAECBEoFBHRpY5RFgAABAW0GCBAgUCogoEsboywCBAgIaDNAgACBUgEBXdoYZREgQEBAmwECBAiUCgjo0sYoiwABAgLaDBAgQKBUQECXNkZZBAgQENBmgAABAqUCArq0McoiQICAgDYDBAgQKBUQ0KWNURYBAgQEtBkgQIBAqYCALm2MsggQICCgzQABAgRKBQR0aWOURYAAAQFtBggQIFAqIKBLG6MsAgQICGgzQIAAgVIBAV3aGGURIEBAQJsBAgQIlAoI6NLGKIsAAQIC2gwQIECgVEBAlzZGWQQIEBDQZoAAAQKlAgK6tDHKIkCAgIA2AwQIECgVENCljVEWAQIEBLQZIECAQKmAgC5tjLIIECAgoM0AAQIESgUEdGljlEWAAAEBbQYIECBQKiCgSxujLAIECAhoM0CAAIFSAQFd2hhlESBAQECbAQIECJQKCOjSxiiLAAECAtoMECBAoFRAQJc2RlkECBAQ0GaAAAECpQICurQxyiJAgICANgMECBAoFRDQpY1RFgECBAS0GSBAgECpgIAubYyyCBAgIKDNAAECBEoFBHRpY5RFgAABAW0GCBAgUCogoEsboywCBAgIaDNAgACBUgEBXdoYZREgQEBAmwECBAiUCgjo0sYoiwABAgLaDBAgQKBUQECXNkZZBAgQENBmgAABAqUCArq0McoiQICAgDYDBAgQKBUQ0KWNURYBAgQEtBkgQIBAqYCALm2MsggQICCgzQABAgRKBQR0aWOURYAAAQFtBggQIFAqIKBLG6MsAgQICGgzQIAAgVIBAV3aGGURIEBAQJsBAgQIlAoI6NLGKIsAAQIC2gwQIECgVEBAlzZGWQQIEBDQZoAAAQKlAgK6tDHKIkCAgIA2AwQIECgVENCljVEWAQIEBLQZIECAQKmAgC5tjLIIECAgoM0AAQIESgUEdGljlEWAAAEBbQYIECBQKiCgSxujLAIECAhoM0CAAIFSAQFd2hhlESBAQECbAQIECJQKCOjSxiiLAAECAtoMECBAoFRAQJc2RlkECBAQ0GaAAAECpQICurQxyiJAgICANgMECBAoFRDQpY1RFgECBAS0GSBAgECpgIAubYyyCBAgIKDNAAECBEoFBHRpY5RFgAABAW0GCBAgUCogoEsboywCBAgIaDNAgACBUgEBXdoYZREgQEBAmwECBAiUCgjo0sYoiwABAgLaDBAgQKBUQECXNkZZBAgQENBmgAABAqUCArq0McoiQICAgDYDBAgQKBUQ0KWNURYBAgQEtBkgQIBAqYCALm2MsggQICCgzQABAgRKBQR0aWOURYAAAQFtBggQIFAqIKBLG6MsAgQICGgzQIAAgVIBAV3aGGURIEBAQJsBAgQIlAoI6NLGKIsAAQIC2gwQIECgVEBAlzZGWQQIEBDQZoAAAQKlAgK6tDHKIkCAgIA2AwQIECgVENCljVEWAQIEBLQZIECAQKmAgC5tjLIIECAgoM0AAQIESgUEdGljlEWAAAEBbQYIECBQKiCgSxujLAIECAhoM0CAAIFSAQFd2hhlESBAQECbAQIECJQKCOjSxiiLAAECAtoMECBAoFRAQJc2RlkECBAQ0GaAAAECpQICurQxyiJAgICANgMECBAoFRDQpY1RFgECBAS0GSBAgECpgIAubYyyCBAgIKDNAAECBEoFBHRpY5RFgAABAW0GCBAgUCogoEsboywCBAgIaDNAgACBUgEBXdoYZREgQEBAmwECBAiUCgjo0sYoiwABAgLaDBAgQKBUQECXNkZZBAgQENBmgAABAqUCArq0McoiQICAgDYDBAgQKBUQ0KWNURYBAgQEtBkgQIBAqYCALm2MsggQICCgzQABAgRKBQR0aWOURYAAAQFtBggQIFAqIKBLG6MsAgQICGgzQIAAgVIBAV3aGGURIEBAQJsBAgQIlAoI6NLGKIsAAQIC2gwQIECgVEBAlzZGWQQIEBDQZoAAAQKlAgK6tDHKIkCAgIA2AwQIECgVENCljVEWAQIEBLQZIECAQKmAgC5tjLIIECAgoM0AAQIESgUEdGljlEWAAAEBbQYIECBQKiCgSxujLAIECAhoM0CAAIFSAQFd2hhlESBAQECbAQIECJQKCOjSxiiLAAECAtoMECBAoFRAQJc2RlkECBAQ0GaAAAECpQICurQxyiJAgICANgMECBAoFRDQpY1RFgECBAS0GSBAgECpgIAubYyyCBAgIKDNAAECBEoFBHRpY5RFgAABAW0GCBAgUCogoEsboywCBAgIaDNAgACBUgEBXdoYZREgQEBAmwECBAiUCgjo0sYoiwABAgLaDBAgQKBUQECXNkZZBAgQENBmgAABAqUCArq0McoiQICAgDYDBAgQKBUQ0KWNURYBAgQEtBkgQIBAqYCALm2MsggQICCgzQABAgRKBQR0aWOURYAAAQFtBggQIFAqIKBLG6MsAgQICGgzQIAAgVIBAV3aGGURIEBAQJsBAgQIlAoI6NLGKIsAAQIC2gwQIECgVEBAlzZGWQQIEBDQZoAAAQKlAgK6tDHKIkCAgIA2AwQIECgVENCljVEWAQIEBLQZIECAQKmAgC5tjLIIECAgoM0AAQIESgUEdGljlEWAAAEBbQYIECBQKiCgSxujLAIECAhoM0CAAIFSAQFd2hhlESBAQECbAQIECJQKCOjSxiiLAAECAtoMECBAoFRAQJc2RlkECBAQ0GaAAAECpQICurQxyiJAgICANgMECBAoFRDQpY1RFgECBAS0GSBAgECpgIAubYyyCBAgIKDNAAECBEoFBHRpY5RFgAABAW0GCBAgUCogoEsboywCBAgIaDNAgACBUgEBXdoYZREgQEBAmwECBAiUCgjo0sYoiwABAgLaDBAgQKBUQECXNkZZBAgQENBmgAABAqUCArq0McoiQICAgDYDBAgQKBUQ0KWNURYBAgQEtBkgQIBAqYCALm2MsggQICCgzQABAgRKBQR0aWOURYAAAQFtBggQIFAqIKBLG6MsAgQICGgzQIAAgVIBAV3aGGURIEBAQJsBAgQIlAoI6NLGKIsAAQIC2gwQIECgVEBAlzZGWQQIEBDQZoAAAQKlAgK6tDHKIkCAgIA2AwQIECgVENCljVEWAQIEBLQZIECAQKmAgC5tjLIIECAgoM0AAQIESgUEdGljlEWAAAEBbQYIECBQKiCgSxujLAIECAhoM0CAAIFSAQFd2hhlESBAQECbAQIECJQKCOjSxiiLAAECAtoMECBAoFRAQJc2RlkECBAQ0GaAAAECpQICurQxyiJAgICANgMECBAoFRDQpY1RFgECBAS0GSBAgECpgIAubYyyCBAgIKDNAAECBEoFBHRpY5RFgAABAW0GCBAgUCogoEsboywCBAgIaDNAgACBUgEBXdoYZREgQEBAmwECBAiUCgjo0sYoiwABAgLaDBAgQKBUQECXNkZZBAgQENBmgAABAqUCArq0McoiQICAgDYDBAgQKBUQ0KWNURYBAgT+H2PCrK8vlEtLAAAAAElFTkSuQmCC')
      .end();
  }
};
