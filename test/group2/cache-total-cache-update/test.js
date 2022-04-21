let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoCAYAAAB65WHVAAAAAXNSR0IArs4c6QAAEBdJREFUeF7t3cur7oscBvBnu985KCShXDKSkokkl4lSJKSUjBiZOjKQGSMDf4BMUEQcE2SoEBIlcskxknK/FLkc/TrvcU7b2ftdu7V2PZ3ns8tkr+Xd3+fzrJ5W73rfda7dk/wiN/lzZ3LH45I8PLnnZp93T3Lt+IQPJX+4wed9/Vry3ps9ho8RIECAwP0Cx6jedHg/nOSVSZ5+QbWX3fjz7rqWvOmCD+PTCBAgMC9woYF+d5LnXZ7KQF/e0CMQIDAkcHagP5bkbUmec3kUA315Q49AgMCQwNmBPp5QfkKSR94A5b7nR66dRzPQ5418BgECBP4ncHagf5bkqUmemORRDwL3ryR/SfKY0/9uMtQG2hceAQIEbkHg7EAfPyS8I8krkrw0yWOTPHCEj++wP5HkJUlec/r4Df59A30LxfhUAgQIXGigj2H+VZLnJ3l9ksc/wO3vSb6T5FtJXn4aaQPtC4sAAQKXF7jQQB+v4jiewvh8kmclecODfKf8zSTfTfK+G9/kO+jL9+URCBAYErjwQB8vs/tNks8keWGS1173nPPPk3w2yQcN9NCXj6gECNxOgVsa6OOQ46mO4zvpFyV51ekHh/9J8o3Tx95joG9nXx6bAIEhgVse6MPml0m+nOTRSZ6d5K+ncX7d6Xloz0EPfQWJSoDAbRM4O9A3eqPK75N8O8mvT091vDjJ8Tbvh/kO+raV5YEJENgSODvQfzt9p/zvJI+495cm/d+ff54+dubNKn5IuPW1JS0BApcUODvQx/PLv03yo9PzzsdTGtf/+cHpreBP8R30JevwfydAgMD9AmcH+ngK49OnN6e88TTS1wN+/PTx43d2PNNTHL6+CBAgcCUCZwf6U0n+keStSZ50+iePt3cfPxh88mmY/5zkC6fnot9hoK+kGA9CgACBswP9kSRvPr2V+z6uu5N8MskHTqN8/P1PktyV5P0G2lcVAQIErkTg7EB/NMlbrntq44dJvpjkeM3z8ZTG8Rvtfnr6uzsN9JUU40EIECBwdqCP75SPH/4dv4PjeAXH8WqOL52e9jj+KyuvPg30V09/9y4D7auKAAECVyJwdqB/fHpTyjOSPC3J8frnPyV5e5LPJTle5XF8B3281O54KuQFBvpKivEgBAgQOAb6d+cYjpfYfS/JH0+/evT4PRzHy+2Osf7+aaSPt34/9+YP9JVryTvP/Vs+ToAAAQL3ChwDfZNfn3GlTHdfS752pY/owQgQIPAQFrjAf6nqIZxeNAIECBQLGOjicpxGgMC2gIHe7l96AgSKBQx0cTlOI0BgW8BAb/cvPQECxQIGurgcpxEgsC1goLf7l54AgWIBA11cjtMIENgWMNDb/UtPgECxgIEuLsdpBAhsCxjo7f6lJ0CgWMBAF5fjNAIEtgUM9Hb/0hMgUCxgoIvLcRoBAtsCBnq7f+kJECgWMNDF5TiNAIFtAQO93b/0BAgUCxjo4nKcRoDAtoCB3u5fegIEigUMdHE5TiNAYFvAQG/3Lz0BAsUCBrq4HKcRILAtYKC3+5eeAIFiAQNdXI7TCBDYFjDQ2/1LT4BAsYCBLi7HaQQIbAsY6O3+pSdAoFjAQBeX4zQCBLYFDPR2/9ITIFAsYKCLy3EaAQLbAgZ6u3/pCRAoFjDQxeU4jQCBbQEDvd2/9AQIFAsY6OJynEaAwLaAgd7uX3oCBIoFDHRxOU4jQGBbwEBv9y89AQLFAga6uBynESCwLWCgt/uXngCBYgEDXVyO0wgQ2BYw0Nv9S0+AQLGAgS4ux2kECGwLGOjt/qUnQKBYwEAXl+M0AgS2BQz0dv/SEyBQLGCgi8txGgEC2wIGert/6QkQKBYw0MXlOI0AgW0BA73dv/QECBQLGOjicpxGgMC2gIHe7l96AgSKBQx0cTlOI0BgW8BAb/cvPQECxQIGurgcpxEgsC1goLf7l54AgWIBA11cjtMIENgWMNDb/UtPgECxgIEuLsdpBAhsCxjo7f6lJ0CgWMBAF5fjNAIEtgUM9Hb/0hMgUCxgoIvLcRoBAtsCBnq7f+kJECgWMNDF5TiNAIFtAQO93b/0BAgUCxjo4nKcRoDAtoCB3u5fegIEigUMdHE5TiNAYFvAQG/3Lz0BAsUCBrq4HKcRILAtYKC3+5eeAIFiAQNdXI7TCBDYFjDQ2/1LT4BAsYCBLi7HaQQIbAsY6O3+pSdAoFjAQBeX4zQCBLYFDPR2/9ITIFAsYKCLy3EaAQLbAgZ6u3/pCRAoFjDQxeU4jQCBbQEDvd2/9AQIFAsY6OJynEaAwLaAgd7uX3oCBIoFDHRxOU4jQGBbwEBv9y89AQLFAga6uBynESCwLWCgt/uXngCBYgEDXVyO0wgQ2BYw0Nv9S0+AQLGAgS4ux2kECGwLGOjt/qUnQKBYwEAXl+M0AgS2BQz0dv/SEyBQLGCgi8txGgEC2wIGert/6QkQKBYw0MXlOI0AgW0BA73dv/QECBQLGOjicpxGgMC2gIHe7l96AgSKBQx0cTlOI0BgW8BAb/cvPQECxQIGurgcpxEgsC1goLf7l54AgWIBA11cjtMIENgWMNDb/UtPgECxgIEuLsdpBAhsCxjo7f6lJ0CgWMBAF5fjNAIEtgUM9Hb/0hMgUCxgoIvLcRoBAtsCBnq7f+kJECgWMNDF5TiNAIFtAQO93b/0BAgUCxjo4nKcRoDAtoCB3u5fegIEigUMdHE5TiNAYFvAQG/3Lz0BAsUCBrq4HKcRILAtYKC3+5eeAIFiAQNdXI7TCBDYFjDQ2/1LT4BAsYCBLi7HaQQIbAsY6O3+pSdAoFjAQBeX4zQCBLYFDPR2/9ITIFAsYKCLy3EaAQLbAgZ6u3/pCRAoFjDQxeU4jQCBbQEDvd2/9AQIFAsY6OJynEaAwLaAgd7uX3oCBIoFDHRxOU4jQGBbwEBv9y89AQLFAga6uBynESCwLWCgt/uXngCBYgEDXVyO0wgQ2BYw0Nv9S0+AQLGAgS4ux2kECGwLGOjt/qUnQKBYwEAXl+M0AgS2BQz0dv/SEyBQLGCgi8txGgEC2wIGert/6QkQKBYw0MXlOI0AgW0BA73dv/QECBQLGOjicpxGgMC2gIHe7l96AgSKBQx0cTlOI0BgW8BAb/cvPQECxQIGurgcpxEgsC1goLf7l54AgWIBA11cjtMIENgWMNDb/UtPgECxgIEuLsdpBAhsCxjo7f6lJ0CgWMBAF5fjNAIEtgUM9Hb/0hMgUCxgoIvLcRoBAtsCBnq7f+kJECgWMNDF5TiNAIFtAQO93b/0BAgUCxjo4nKcRoDAtoCB3u5fegIEigUMdHE5TiNAYFvAQG/3Lz0BAsUCBrq4HKcRILAtYKC3+5eeAIFiAQNdXI7TCBDYFjDQ2/1LT4BAsYCBLi7HaQQIbAsY6O3+pSdAoFjAQBeX4zQCBLYFDPR2/9ITIFAsYKCLy3EaAQLbAgZ6u3/pCRAoFjDQxeU4jQCBbQEDvd2/9AQIFAsY6OJynEaAwLaAgd7uX3oCBIoFDHRxOU4jQGBbwEBv9y89AQLFAga6uBynESCwLWCgt/uXngCBYgEDXVyO0wgQ2BYw0Nv9S0+AQLGAgS4ux2kECGwLGOjt/qUnQKBYwEAXl+M0AgS2BQz0dv/SEyBQLGCgi8txGgEC2wIGert/6QkQKBYw0MXlOI0AgW0BA73dv/QECBQLGOjicpxGgMC2gIHe7l96AgSKBQx0cTlOI0BgW8BAb/cvPQECxQIGurgcpxEgsC1goLf7l54AgWIBA11cjtMIENgWMNDb/UtPgECxgIEuLsdpBAhsCxjo7f6lJ0CgWMBAF5fjNAIEtgUM9Hb/0hMgUCxgoIvLcRoBAtsCBnq7f+kJECgWMNDF5TiNAIFtAQO93b/0BAgUCxjo4nKcRoDAtoCB3u5fegIEigUMdHE5TiNAYFvAQG/3Lz0BAsUCBrq4HKcRILAtYKC3+5eeAIFiAQNdXI7TCBDYFjDQ2/1LT4BAsYCBLi7HaQQIbAsY6O3+pSdAoFjAQBeX4zQCBLYFDPR2/9ITIFAsYKCLy3EaAQLbAgZ6u3/pCRAoFjDQxeU4jQCBbQEDvd2/9AQIFAsY6OJynEaAwLaAgd7uX3oCBIoFDHRxOU4jQGBbwEBv9y89AQLFAga6uBynESCwLWCgt/uXngCBYgEDXVyO0wgQ2BYw0Nv9S0+AQLGAgS4ux2kECGwLGOjt/qUnQKBYwEAXl+M0AgS2BQz0dv/SEyBQLGCgi8txGgEC2wIGert/6QkQKBYw0MXlOI0AgW0BA73dv/QECBQLGOjicpxGgMC2gIHe7l96AgSKBQx0cTlOI0BgW8BAb/cvPQECxQIGurgcpxEgsC1goLf7l54AgWIBA11cjtMIENgWMNDb/UtPgECxgIEuLsdpBAhsCxjo7f6lJ0CgWMBAF5fjNAIEtgUM9Hb/0hMgUCxgoIvLcRoBAtsCBnq7f+kJECgWMNDF5TiNAIFtAQO93b/0BAgUCxjo4nKcRoDAtoCB3u5fegIEigUMdHE5TiNAYFvAQG/3Lz0BAsUCBrq4HKcRILAtYKC3+5eeAIFiAQNdXI7TCBDYFjDQ2/1LT4BAsYCBLi7HaQQIbAsY6O3+pSdAoFjAQBeX4zQCBLYFDPR2/9ITIFAsYKCLy3EaAQLbAgZ6u3/pCRAoFjDQxeU4jQCBbQEDvd2/9AQIFAsY6OJynEaAwLaAgd7uX3oCBIoFDHRxOU4jQGBbwEBv9y89AQLFAga6uBynESCwLWCgt/uXngCBYgEDXVyO0wgQ2BYw0Nv9S0+AQLGAgS4ux2kECGwLGOjt/qUnQKBYwEAXl+M0AgS2BQz0dv/SEyBQLGCgi8txGgEC2wIGert/6QkQKBYw0MXlOI0AgW0BA73dv/QECBQLGOjicpxGgMC2gIHe7l96AgSKBQx0cTlOI0BgW8BAb/cvPQECxQIGurgcpxEgsC1goLf7l54AgWIBA11cjtMIENgWMNDb/UtPgECxgIEuLsdpBAhsCxjo7f6lJ0CgWMBAF5fjNAIEtgUM9Hb/0hMgUCxgoIvLcRoBAtsCBnq7f+kJECgWMNDF5TiNAIFtAQO93b/0BAgUCxjo4nKcRoDAtoCB3u5fegIEigUMdHE5TiNAYFvAQG/3Lz0BAsUCBrq4HKcRILAtYKC3+5eeAIFiAQNdXI7TCBDYFjDQ2/1LT4BAsYCBLi7HaQQIbAsY6O3+pSdAoFjAQBeX4zQCBLYFDPR2/9ITIFAsYKCLy3EaAQLbAgZ6u3/pCRAoFjDQxeU4jQCBbQEDvd2/9AQIFAsY6OJynEaAwLaAgd7uX3oCBIoFDHRxOU4jQGBbwEBv9y89AQLFAga6uBynESCwLWCgt/uXngCBYgEDXVyO0wgQ2BYw0Nv9S0+AQLGAgS4ux2kECGwLGOjt/qUnQKBYwEAXl+M0AgS2BQz0dv/SEyBQLGCgi8txGgEC2wIGert/6QkQKBYw0MXlOI0AgW0BA73dv/QECBQL/BcbPqNpXWausgAAAABJRU5ErkJggg==')
      .end();
  }
};
