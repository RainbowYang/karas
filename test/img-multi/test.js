let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('#base64', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoCAYAAAB65WHVAAARQUlEQVR4Xu3dTY6cVxXH4aqyB3xMsgRa7QVE6kGPENkBJBsg2QHsACZABEjZAWYFZAeEYQ8sGDBsqTIAxgGJj4nLqJEdnHZ1fG/f+977r7cfZpDqqvM+5+RHyWBn+89vbF5s/CtG4Nv/2WxjhjEIAQJTBbYCPdX/jQ8X6Kx9mIbATAGBnql/5LMFOmwhxiEwUUCgJ+If+2iBDluIcQhMFBDoifgCHYZvHAJhAgIdthDfoMMWYhwCEwUEeiK+b9Bh+MYhECYg0GEL8Q06bCHGITBRQKAn4vsGHYZvHAJhAgIdthDfoMMWYhwCEwWKA/2tf/sNhy17+tc3y36DoEC3KPtZAusSEOhB+xToQdA+hsCKBAR60DIFehC0jyGwIgGBHrRMgR4E7WMIrEhAoActU6AHQfsYAisSEOhByxToQdA+hsCKBAR60DIFehC0jyGwIgGBHrRMgR4E7WMIrEhAoActU6AHQfsYAisSEOhByxToQdA+hsCKBAR60DIFehC0jyGwIgGBHrRMgR4E7WMIrEhAoActU6AHQfsYAisSEOhByxToQdA+hsCKBAR60DIFehC0jyGwIoGTDHRp7JL+iNTSmf1xoyv6u8ujEGgUOIlAl8btbRYzg136DAL9ti366wQejkB0oEujVruuGaEufRaBrt2m1xNYr0BkoEtj1rqWkaEufSaBbt2qnyewHoG4QJeGrNcKRkW69LkEutdmvQ+B0xeICXRpwJYiXzrUpc8n0Ett2PsSOD2BiECXxmtp3iUjXfqMAr30lr0/gdMRmB7o0nCNIl0q0qXPKdCjNu1zCOQLTA10abRGMy4R6dJnFejR2/Z5BHIFpgW6NFiz6HpHuvR5BXrWxn0ugTwBgb5jJwKdd6wmIvDQBKYEuvTb5Oxl9Ix06TP7Bj176z6fQI7A8ECXhiqFqFekS59boFM2bw4C8wUE+i07EOj5R2oCAg9VYGigS79Fpi2jR6RLn9036LTtm4fAPAGBLrAX6AIkLyFAoLvAsECXfoPs/oSd3rA10qXP7xt0p4V5GwIrEBDowiUKdCGUlxEg0E1AoAspBboQyssIEOgmINCFlAJdCOVlBAh0ExgS6NJff+32VAu9UUukSw38GvRCy/O2BE5QQKArlibQFVheSoBAs4BAVxAKdAWWlxIg0Cwg0BWEAl2B5aUECDQLCHQFoUBXYHkpAQLNAgJdQSjQFVheSoBAs4BAVxAKdAWWlxIg0Cwg0BWEAl2B5aUECDQLCHQFoUBXYHkpAQLNAgJdQSjQFVheSoBAs8CQQN9MWfo76ZqfaKE3aIlzzfP7nYQLLdDbEjhBAYEuXJpAF0J5GQEC3QQEupBSoAuhvIwAgW4CAl1IKdCFUF5GgEA3gWGBrvl12G5P1+mNWuNc8+x+DbrT0rwNgRUICHTBEgW6AMlLCBDoLjA00DXfJLs/6T3fsEeca57bN+h7LsqPEVihgEC/ZakCvcKr90gETkRgeKBrvk3ONuwV55pn9g169tZ9PoEcgSmBrgnWLKqeca55XoGetXGfSyBPQKDv2IlA5x2riQg8NIFpga75Vjl6Kb3jXPOsvkGP3rbPI5ArMDXQNeEaRbhEnGue889/uPpg1LMe+5zLy8vfzfx8n02AwP8Fpge6Jl5LL26pOJc+4z+++97mrz//1cfb7fZq6Wc99v6Hw+Fyt9tdXVxciPSMBfhMArcEIgJdGrAlt7dknEuf7ybQf/vFrz+YFcirq6v3Hz9+vJn1+Uvu13sTOEWBmEC/whv9x5IuHeaa5xLoU/xbyMwElhOIC3Tpt80eJKPiXPpMAt1jq96DwHoEIgNd863zPqsYGeaaZxHo+2zTzxBYr0B0oGviVrKiGWGueQaBLtmi1xB4OAInEejb6yj9deqZQb7PzEsEer/ff+dwOPzw5Txf7Ha7356dnX1x7MT9j4QP5298T3oaAicZ6NOg/eqUJf+l0jvQ+/3+3cPh8MdbXjeRPjsWaYE+xcsy85oFBHrQdmcE+vr6+tPtdvv9I4/44/Pz809u/+cCPegYfAyBQgGBLoRqfdmkQH+23W6/d2T2n56fn/9EoFu36ucJLCsg0Mv6fvnukwJ91zdogR60dx9DoEVAoFv0Kn52UqB/sN1ub/+27b/vdrt3z87OPvcNumKBXkpggoBAD0LvGej9fv/OXf9PjNuPs9/v33v+/PmPNpvNO5vN5vNHjx59cnZ29qdjj+3XoAcdg48hUCgg0IVQrS/rGejr6+vPNpvN0ydPnjxtnev1nxfonprei0C7gEC3Gxa9Q69A33wjPhwOv7/50BcvXnzUM9ICXbRKLyIwTECgB1H3CvTNt+fX/58ZPSMt0IOOwccQKBQQ6EKo1pf1CPTr355fn+dYpK+vrz+8Cfn5+flHpbMLdKmU1xEYIyDQY5w3PQJ9+9vzXZF+GeffvPzrT0sjLdCDjsHHECgUEOhCqNaXtQb6rm/PtyN98++32+2rOL/6y0WRFujWLft5An0FBLqv553v1hror/v2XPgIb420QBdKehmBQQICPQi6JdAl354LH+NrIy3QhYpeRmCQgEAPgm4JdIdvz68/5Z2RFuhBx+BjCBQKFAe68P28rEHg2B83escfGdrwKf/70aORFuhWVj9PoK+AQPf1bHq3OwL95W9MaXrzN3/4jUgLdGdhb0egUUCgGwF7/vjgQL/xTVqge27TexFoFxDodsNu73BHoG/+kVUfdvuQW2+02+0+ffWHJwn0Usrel8D9BAT6fm6L/FTvf+RV7ZACXSvm9QSWFRDoZX2r3l2gq7i8mMDqBQQ6aMUCHbQMoxAIEBDogCW8GkGgg5ZhFAIBAgIdsASBDlqCUQgECQh00DJuvkH/5We//PhwOFzNGGu3213udruri4uL2/8cwxnj+EwCD15g++AFwgCePXv2/syRxHmmvs8m8FUBgXYRBAgQCBUQ6NDFGIsAAQIC7QYIECAQKiDQoYsxFgECBATaDRAgQCBUQKBDF2MsAgQICLQbIECAQKiAQIcuxlgECBAQaDdAgACBUAGBDl2MsQgQICDQboAAAQKhAgIduhhjESBAQKDdAAECBEIFBDp0McYiQICAQLsBAgQIhAoIdOhijEWAAAGBdgMECBAIFRDo0MUYiwABAgLtBggQIBAqINChizEWAQIEBNoNECBAIFRAoEMXYywCBAgItBsgQIBAqIBAhy7GWAQIEBBoN0CAAIFQAYEOXYyxCBAgINBugAABAqECAh26GGMRIEBAoN0AAQIEQgUEOnQxxiJAgIBAuwECBAiECgh06GKMRYAAAYF2AwQIEAgVEOjQxRiLAAECAu0GCBAgECog0KGLMRYBAgQE2g0QIEAgVECgQxdjLAIECAi0GyBAgECogECHLsZYBAgQEGg3QIAAgVABgQ5djLEIECAg0G6AAAECoQICHboYYxEgQECg3QABAgRCBQQ6dDHGIkCAgEC7AQIECIQKCHToYoxFgAABgXYDBAgQCBUQ6NDFGIsAAQIC7QYIECAQKiDQoYsxFgECBATaDRAgQCBUQKBDF2MsAgQICLQbIECAQKiAQIcuxlgECBAQaDdAgACBUAGBDl2MsQgQICDQboAAAQKhAgIduhhjESBAQKDdAAECBEIFBDp0McYiQICAQLsBAgQIhAoIdOhijEWAAAGBdgMECBAIFRDo0MUYiwABAgLtBggQIBAqINChizEWAQIEBNoNECBAIFRAoEMXYywCBAgItBsgQIBAqIBAhy7GWAQIEBBoN0CAAIFQAYEOXYyxCBAgINBugAABAqECAh26GGMRIEBAoN0AAQIEQgUEOnQxxiJAgIBAuwECBAiECgh06GKMRYAAAYF2AwQIEAgVEOjQxRiLAAECAu0GCBAgECog0KGLMRYBAgQE2g0QIEAgVECgQxdjLAIECAi0GyBAgECogECHLsZYBAgQEGg3QIAAgVABgQ5djLEIECAg0G6AAAECoQICHboYYxEgQECg3QABAgRCBQQ6dDHGIkCAgEC7AQIECIQKCHToYoxFgAABgXYDBAgQCBUQ6NDFGIsAAQIC7QYIECAQKiDQoYsxFgECBATaDRAgQCBUQKBDF2MsAgQICLQbIECAQKiAQIcuxlgECBAQaDdAgACBUAGBDl2MsQgQICDQboAAAQKhAgIduhhjESBAQKDdAAECBEIFBDp0McYiQICAQLsBAgQIhAoIdOhijEWAAAGBdgMECBAIFRDo0MUYiwABAgLtBggQIBAqINChizEWAQIEBNoNECBAIFRAoEMXYywCBAgItBsgQIBAqIBAhy7GWAQIEBBoN0CAAIFQAYEOXYyxCBAgINBugAABAqECAh26GGMRIEBAoN0AAQIEQgUEOnQxxiJAgIBAuwECBAiECgh06GKMRYAAAYF2AwQIEAgVEOjQxRiLAAECAu0GCBAgECog0KGLMRYBAgQE2g0QIEAgVECgQxdjLAIECAi0GyBAgECogECHLsZYBAgQEGg3QIAAgVABgQ5djLEIECAg0G6AAAECoQICHboYYxEgQECg3QABAgRCBQQ6dDHGIkCAgEC7AQIECIQKCHToYoxFgAABgXYDBAgQCBUQ6NDFGIsAAQIC7QYIECAQKiDQoYsxFgECBATaDRAgQCBUQKBDF2MsAgQICLQbIECAQKiAQIcuxlgECBAQaDdAgACBUAGBDl2MsQgQICDQboAAAQKhAgIduhhjESBAQKDdAAECBEIFBDp0McYiQICAQLsBAgQIhAoIdOhijEWAAAGBdgMECBAIFRDo0MUYiwABAgLtBggQIBAqINChizEWAQIEBNoNECBAIFRAoEMXYywCBAgItBsgQIBAqIBAhy7GWAQIEBBoN0CAAIFQAYEOXYyxCBAgINBugAABAqECAh26GGMRIEBAoN0AAQIEQgUEOnQxxiJAgIBAuwECBAiECgh06GKMRYAAAYF2AwQIEAgVEOjQxRiLAAECAu0GCBAgECog0KGLMRYBAgQE2g0QIEAgVECgQxdjLAIECAi0GyBAgECogECHLsZYBAgQEGg3QIAAgVABgQ5djLEIECAg0G6AAAECoQICHboYYxEgQECg3QABAgRCBQQ6dDHGIkCAgEC7AQIECIQKCHToYoxFgAABgXYDBAgQCBUQ6NDFGIsAAQIC7QYIECAQKiDQoYsxFgECBATaDRAgQCBUQKBDF2MsAgQICLQbIECAQKiAQIcuxlgECBAQaDdAgACBUAGBDl2MsQgQICDQboAAAQKhAgIduhhjESBAQKDdAAECBEIFBDp0McYiQICAQLsBAgQIhAoIdOhijEWAAAGBdgMECBAIFRDo0MUYiwABAgLtBggQIBAqINChizEWAQIEBNoNECBAIFRAoEMXYywCBAgItBsgQIBAqIBAhy7GWAQIEBBoN0CAAIFQAYEOXYyxCBAgINBugAABAqECAh26GGMRIEBAoN0AAQIEQgUEOnQxxiJAgIBAuwECBAiECgh06GKMRYAAAYF2AwQIEAgVEOjQxRiLAAECAu0GCBAgECog0KGLMRYBAgQE2g0QIEAgVECgQxdjLAIECAi0GyBAgECogECHLsZYBAgQEGg3QIAAgVABgQ5djLEIECAg0G6AAAECoQICHboYYxEgQECg3QABAgRCBQQ6dDHGIkCAgEC7AQIECIQKCHToYoxFgAABgXYDBAgQCBUQ6NDFGIsAAQIC7QYIECAQKiDQoYsxFgECBATaDRAgQCBUQKBDF2MsAgQICLQbIECAQKiAQIcuxlgECBAQaDdAgACBUAGBDl2MsQgQICDQboAAAQKhAgIduhhjESBAQKDdAAECBEIFBDp0McYiQICAQLsBAgQIhAoIdOhijEWAAAGBdgMECBAIFRDo0MUYiwABAgLtBggQIBAq8F+eqGKl9HQCKAAAAABJRU5ErkJggg==')
      .assert.value('#base642', '{"bb":[],"children":[{"bb":[],"children":[{"type":"img","tagName":"image","props":[["xlink:href","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAQMAAABKLAcXAAAABlBMVEX1CAD////Q9ly2AAAAhUlEQVQ4y93TMQ6AIAwF0BIHRo/AUTyaHM2jeARGBoNSkvqNkBASh8YO/rzR9kOqZjllth8pmqc8OSgRWSgSGSjkEL3D53C3KM8sSiwrOlhTW5FlRIFFbe1Fa0v85RyWL3IqNPwPnb109onNd2+Ea+LSzRYg0J66WWhd1Ui0Vc/L+Vaa5gJ+8ifpfqdy4gAAAABJRU5ErkJggg=="],["x",0],["y",0],["width",100],["height",100]]}],"visibility":"visible","type":"dom"},{"bb":[],"children":[{"type":"item","tagName":"rect","props":[["x",100],["y",68],["width",32],["height",32],["stroke","#CCC"],["stroke-width",0.64],["fill","rgba(0,0,0,0)"]]},{"type":"item","tagName":"circle","props":[["cx",122.4],["cy",77.6],["r",3.2],["fill","#DDD"]]},{"type":"item","tagName":"polygon","props":[["points","104.8,90.4 109.6,80.8 116,87.2 119.2,84 128.8,93.6 104.8,93.6"],["fill","#DDD"]]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom","defs":[]}')
      .end();
  }
};
