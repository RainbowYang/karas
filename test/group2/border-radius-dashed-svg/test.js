let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M15,30C15,21.715728752538098 21.715728752538098,15 30,15L240,15C248.2842712474619,15 255,21.715728752538098 255,30L255,200C255,208.2842712474619 248.2842712474619,215 240,215L30,215C21.715728752538098,215 15,208.2842712474619 15,200"],["fill","rgba(255,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M8.786796564403573,8.786796564403577C11.066836123217218,6.506757005589932 13.699544870546642,4.609207902229834 16.58359213500126,3.167184270002526L19.393398282201787,19.393398282201787M16.58359213500126,3.167184270002526C20.749255169844815,1.0843527525807488 25.342647141365873,3.552713678800501e-15 30,0L30,15C26.02175265240684,14.999999999999998 22.206443958922307,16.580352605481266 19.393398282201787,19.393398282201787M30,0L45,0L45,15L30,15M75,0L120,0L120,15L75,15M150,0L195,0L195,15L150,15M225,0L240,0L240,15L225,15M240,0C244.6573528586341,3.552713678800501e-15 249.25074483015518,1.0843527525807488 253.41640786499875,3.167184270002526L250.6066017177982,19.393398282201787C247.7935560410777,16.580352605481266 243.97824734759317,14.999999999999998 240,15M253.41640786499875,3.167184270002526C256.3004551294534,4.609207902229834 258.93316387678277,6.506757005589932 261.2132034355964,8.786796564403577L250.6066017177982,19.393398282201787"],["fill","rgba(0,0,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M261.2132034355964,8.786796564403577C263.4932429944101,11.066836123217215 265.39079209777015,13.699544870546639 266.8328157299975,16.58359213500126L250.6066017177982,19.393398282201787M266.8328157299975,16.58359213500126C268.91564724741926,20.749255169844808 270,25.342647141365873 270,29.999999999999996L255,30C255,26.02175265240684 253.41964739451873,22.206443958922307 250.6066017177982,19.393398282201787M255,30L270,30L270,45L255,45M255,61.66666666666667L270,61.66666666666667L270,106.66666666666667L255,106.66666666666667M255,123.33333333333334L270,123.33333333333334L270,168.33333333333334L255,168.33333333333334M255,185L270,185L270,200L255,200M270,200C270,204.65735285863414 268.91564724741926,209.25074483015518 266.8328157299975,213.41640786499875L250.6066017177982,210.6066017177982C253.41964739451873,207.7935560410777 255,203.97824734759317 255,200M266.8328157299975,213.41640786499875C265.39079209777015,216.30045512945335 263.4932429944101,218.93316387678277 261.2132034355964,221.21320343559643L250.6066017177982,210.6066017177982"],["fill","rgba(0,0,255,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M8.786796564403573,221.21320343559643C11.066836123217218,223.49324299441008 13.699544870546642,225.39079209777017 16.58359213500126,226.83281572999746L19.393398282201787,210.6066017177982M16.58359213500126,226.83281572999746C20.749255169844815,228.91564724741926 25.342647141365873,230 30,230L30,215C26.02175265240684,215 22.206443958922307,213.41964739451873 19.393398282201787,210.6066017177982M30,215L45,215L45,230L30,230M75,215L120,215L120,230L75,230M150,215L195,215L195,230L150,230M225,215L240,215L240,230L225,230M240,230C244.6573528586341,230 249.25074483015518,228.91564724741926 253.41640786499875,226.83281572999746L250.6066017177982,210.6066017177982C247.7935560410777,213.41964739451873 243.97824734759317,215 240,215M253.41640786499875,226.83281572999746C256.3004551294534,225.39079209777017 258.93316387678277,223.49324299441008 261.2132034355964,221.21320343559643L250.6066017177982,210.6066017177982"],["fill","rgba(255,0,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M8.786796564403573,8.786796564403577C6.506757005589932,11.066836123217215 4.609207902229834,13.699544870546639 3.167184270002526,16.58359213500126L19.393398282201787,19.393398282201787M3.167184270002526,16.58359213500126C1.0843527525807524,20.749255169844808 3.552713678800501e-15,25.342647141365873 0,29.999999999999996L15,30C14.999999999999998,26.02175265240684 16.580352605481266,22.206443958922307 19.393398282201787,19.393398282201787M0,30L15,30L15,45L0,45M0,61.66666666666667L15,61.66666666666667L15,106.66666666666667L0,106.66666666666667M0,123.33333333333334L15,123.33333333333334L15,168.33333333333334L0,168.33333333333334M0,185L15,185L15,200L0,200M0,200C3.552713678800501e-15,204.65735285863414 1.0843527525807524,209.25074483015518 3.167184270002526,213.41640786499875L19.393398282201787,210.6066017177982C16.580352605481266,207.7935560410777 14.999999999999998,203.97824734759317 15,200M3.167184270002526,213.41640786499875C4.609207902229834,216.30045512945335 6.506757005589932,218.93316387678277 8.786796564403573,221.21320343559643L19.393398282201787,210.6066017177982"],["fill","rgba(0,255,0,0.5)"]]}],"children":[],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom","defs":[]}')
      .end();
  }
};
