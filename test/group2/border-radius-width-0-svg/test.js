let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M0,21C0,9.402020253553335 4.477152501692064,0 10,0L10,0C15.522847498307936,0 20,9.402020253553335 20,21L20,27C20,38.59797974644667 11.045694996615872,48 0,48L0,48"],["fill","rgba(255,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M4.078152824948185,4.078152824948187C5.794846040564271,1.428794459401221 7.86958497172296,3.552713678800501e-15 10,0L10,10L0,0M10,0L10,0L10,10L10,10M10,0L10,0L10,10L10,10M10,0L10,0L10,10L10,10M10,0C12.13041502827704,3.552713678800501e-15 14.20515395943573,1.428794459401221 15.921847175051816,4.078152824948187L20,0L10,10"],["fill","rgba(0,0,255,1)"]]},{"type":"item","tagName":"path","props":[["d","M15.921847175051816,4.078152824948187C17.147961166165476,5.970404352432306 18.152279261862382,8.425290238243978 18.858315352801554,11.25585311191829L10,10L20,0M18.858315352801554,11.25585311191829C19.60825487083561,14.26242881603665 20,17.605928345994712 20,21L10,21L10,10M10,21L20,21L20,27L10,27M20,27C19.999999999999996,30.394071654005288 19.21650974167122,33.73757118396335 17.716630705603105,36.74414688808171L7.071067811865474,34.77817459305202C8.946431596345821,32.71527443012364 10,29.917381388234986 10,27M17.716630705603105,36.74414688808171C16.746455815915116,38.68890655331991 15.491847457376192,40.46189963382163 13.998521363613706,41.998521363613705L6.93015234009523,34.93015234009523C6.977577461005111,34.880004172537426 7.024551571733671,34.82934245719701 7.071067811865474,34.77817459305202"],["fill","rgba(0,0,255,1)"]]},{"type":"item","tagName":"path","props":[["d","M0,48L0,38L0,48L0,48M0,48C3.1049019057560847,48 6.167163220103458,47.240953073193474 8.944271909999157,45.78297101099823L6.93015234009523,34.93015234009523C5.195704027385128,36.8410747559804 2.652164898395441,38 0,38M8.944271909999157,45.78297101099823L10,38L6.93015234009523,34.93015234009523M8.944271909999157,45.78297101099823C10.806341057442973,44.805384708590225 12.511627523863394,43.52852435063558 13.998521363613706,41.998521363613705L6.93015234009523,34.93015234009523C6.882727219185347,34.980300507653034 6.93015234009523,34.93015234009523 6.93015234009523,34.93015234009523"],["fill","rgba(0,0,255,1)"]]},{"type":"item","tagName":"path","props":[["d","M4.078152824948185,4.078152824948187C2.8520388338345235,5.970404352432306 1.8477207381376175,8.425290238243978 1.1416846471984474,11.25585311191829L10,10L0,0M1.1416846471984474,11.25585311191829C0.39174512916438964,14.26242881603665 1.7763568394002505e-15,17.605928345994712 0,21L10,21L10,10M0,21L10,21L10,38L0,38M0,38L10,38L0,48L0,48"],["fill","rgba(0,0,255,1)"]]}],"children":[],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom","defs":[]}')
      .end();
  }
};
