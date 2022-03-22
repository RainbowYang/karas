let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M0,0L66.7031,0L66.7031,58.3984375L0,58.3984375L0,0"],["fill","rgba(255,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M0,0L10,0L10,10L0,0M10,0L56.7031,0L56.7031,10L10,10M56.7031,0L66.7031,0L66.7031,0L56.7031,10"],["fill","rgba(0,0,0,0.1)"]]},{"type":"item","tagName":"path","props":[["d","M66.7031,0L66.7031,0L66.7031,10L56.7031,10M56.7031,10L66.7031,10L66.7031,48.3984375L56.7031,48.3984375M56.7031,48.3984375L66.7031,48.3984375L66.7031,58.3984375L66.7031,58.3984375"],["fill","rgba(0,0,0,0.1)"]]},{"type":"item","tagName":"path","props":[["d","M0,58.3984375L10,48.3984375L10,58.3984375L0,58.3984375M10,48.3984375L56.7031,48.3984375L56.7031,58.3984375L10,58.3984375M56.7031,48.3984375L66.7031,58.3984375L66.7031,58.3984375L56.7031,58.3984375"],["fill","rgba(0,0,0,0.1)"]]},{"type":"item","tagName":"path","props":[["d","M0,0L0,0L10,10L0,10M0,10L10,10L10,48.3984375L0,48.3984375M0,48.3984375L10,48.3984375L0,58.3984375L0,58.3984375"],["fill","rgba(0,0,0,0.1)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",20],["y",34.484375],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"123"}]}],"visibility":"visible","type":"dom"},{"bb":[{"type":"item","tagName":"path","props":[["d","M66.7031,15C66.7031,6.715728752538096 73.4188287525381,0 81.7031,0L118.40620000000001,0C126.69047124746191,0 133.4062,6.715728752538096 133.4062,15L133.4062,43.3984375C133.4062,51.6827087474619 126.69047124746191,58.3984375 118.40620000000001,58.3984375L81.7031,58.3984375C73.4188287525381,58.3984375 66.7031,51.6827087474619 66.7031,43.3984375"],["fill","rgba(255,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M71.0964982822018,4.3933982822017885C72.74312117656116,2.7467753878424155 74.75050707469043,1.5061426742612962 76.95968350974744,0.7697505292422928L78.16756609406727,11.464466094067262M76.95968350974744,0.7697505292422928C78.48918054321622,0.259918184752701 80.0908685665893,1.7763568394002505e-15 81.7031,0L81.7031,10C80.37701755080228,10 79.10524798630745,10.526784201827088 78.16756609406727,11.464466094067262M81.7031,0L118.40620000000001,0L118.40620000000001,10L81.7031,10M118.40620000000001,0C120.01843143341073,1.7763568394002505e-15 121.6201194567838,0.259918184752701 123.14961649025258,0.7697505292422928L121.94173390593275,11.464466094067262C121.00405201369257,10.526784201827088 119.73228244919774,10 118.40620000000001,10M123.14961649025258,0.7697505292422928C125.35879292530959,1.5061426742612962 127.36617882343886,2.7467753878424155 129.01280171779823,4.3933982822017885L121.94173390593275,11.464466094067262"],["fill","rgba(0,0,0,0.1)"]]},{"type":"item","tagName":"path","props":[["d","M129.01280171779823,4.3933982822017885C130.6594246121576,6.040021176561158 131.90005732573871,8.047407074690426 132.63644947075773,10.256583509747431L121.94173390593275,11.464466094067262M132.63644947075773,10.256583509747431C133.1462818152473,11.78608054321621 133.4062,13.387768566589289 133.4062,14.999999999999998L123.40620000000001,15C123.40620000000001,13.67391755080228 122.87941579817293,12.402147986307435 121.94173390593275,11.464466094067262M123.40620000000001,15L133.4062,15L133.4062,43.3984375L123.40620000000001,43.3984375M133.4062,43.3984375C133.4062,45.01066893341071 133.1462818152473,46.61235695678379 132.63644947075773,48.14185399025257L121.94173390593275,46.93397140593274C122.87941579817293,45.99628951369257 123.40620000000001,44.72451994919772 123.40620000000001,43.3984375M132.63644947075773,48.14185399025257C131.90005732573871,50.351030425309574 130.6594246121576,52.358416323438846 129.01280171779823,54.00503921779821L121.94173390593275,46.93397140593274"],["fill","rgba(0,0,0,0.1)"]]},{"type":"item","tagName":"path","props":[["d","M71.0964982822018,54.00503921779821C72.74312117656116,55.65166211215758 74.75050707469043,56.8922948257387 76.95968350974744,57.628686970757705L78.16756609406727,46.93397140593274M76.95968350974744,57.628686970757705C78.48918054321622,58.1385193152473 80.0908685665893,58.3984375 81.7031,58.3984375L81.7031,48.3984375C80.37701755080228,48.3984375 79.10524798630745,47.87165329817291 78.16756609406727,46.93397140593274M81.7031,48.3984375L118.40620000000001,48.3984375L118.40620000000001,58.3984375L81.7031,58.3984375M118.40620000000001,58.3984375C120.01843143341073,58.3984375 121.6201194567838,58.1385193152473 123.14961649025258,57.628686970757705L121.94173390593275,46.93397140593274C121.00405201369257,47.87165329817291 119.73228244919774,48.3984375 118.40620000000001,48.3984375M123.14961649025258,57.628686970757705C125.35879292530959,56.8922948257387 127.36617882343886,55.65166211215758 129.01280171779823,54.00503921779821L121.94173390593275,46.93397140593274"],["fill","rgba(0,0,0,0.1)"]]},{"type":"item","tagName":"path","props":[["d","M71.0964982822018,4.3933982822017885C69.44987538784243,6.040021176561158 68.2092426742613,8.047407074690426 67.4728505292423,10.256583509747431L78.16756609406727,11.464466094067262M67.4728505292423,10.256583509747431C66.96301818475271,11.78608054321621 66.7031,13.387768566589289 66.7031,14.999999999999998L76.7031,15C76.7031,13.67391755080228 77.22988420182709,12.402147986307435 78.16756609406727,11.464466094067262M66.7031,15L76.7031,15L76.7031,43.3984375L66.7031,43.3984375M66.7031,43.3984375C66.7031,45.01066893341071 66.96301818475271,46.61235695678379 67.4728505292423,48.14185399025257L78.16756609406727,46.93397140593274C77.22988420182709,45.99628951369257 76.7031,44.72451994919772 76.7031,43.3984375M67.4728505292423,48.14185399025257C68.2092426742613,50.351030425309574 69.44987538784243,52.358416323438846 71.0964982822018,54.00503921779821L78.16756609406727,46.93397140593274"],["fill","rgba(0,0,0,0.1)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",86.7031],["y",34.484375],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"123"}]}],"visibility":"visible","type":"dom"},{"bb":[{"type":"item","tagName":"path","props":[["d","M133.4062,25C133.4062,11.19288125423016 144.59908125423019,0 158.4062,0L175.10930000000002,0C188.91641874576985,0 200.10930000000002,11.19288125423016 200.10930000000002,25L200.10930000000002,33.3984375C200.10930000000002,47.20555624576984 188.91641874576985,58.3984375 175.10930000000002,58.3984375L158.4062,58.3984375C144.59908125423019,58.3984375 133.4062,47.20555624576984 133.4062,33.3984375"],["fill","rgba(255,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M140.72853047033632,7.322330470336315C142.1738886743234,5.876972266349231 143.79105183728487,4.614329423402591 145.54380611431185,3.5626768571863963L147.7995982822018,14.393398282201789M145.54380611431185,3.5626768571863963C149.4291911536995,1.2314458335538028 153.87510134847582,0 158.4062,0L158.4062,10C154.42795265240684,9.999999999999998 150.61264395892232,11.580352605481266 147.7995982822018,14.393398282201787M158.4062,0L175.10930000000002,0L175.10930000000002,10L158.4062,10M175.10930000000002,0C179.6403986515242,0 184.08630884630054,1.2314458335538028 187.97169388568818,3.5626768571863963L185.71590171779823,14.393398282201787C182.9028560410777,11.580352605481266 179.0875473475932,9.999999999999998 175.10930000000002,10M187.97169388568818,3.5626768571863963C189.72444816271516,4.614329423402591 191.34161132567664,5.876972266349231 192.7869695296637,7.322330470336315L185.71590171779823,14.393398282201787"],["fill","rgba(0,0,0,0.1)"]]},{"type":"item","tagName":"path","props":[["d","M192.7869695296637,7.322330470336315C194.23232773365078,8.767688674323395 195.49497057659744,10.384851837284847 196.54662314281362,12.137606114311838L185.71590171779823,14.393398282201789M196.54662314281362,12.137606114311838C198.8778541664462,16.02299115369948 200.10930000000002,20.468901348475807 200.10930000000002,25L190.10930000000002,25C190.10930000000002,21.02175265240684 188.52894739451875,17.206443958922307 185.71590171779823,14.393398282201789M190.10930000000002,25L200.10930000000002,25L200.10930000000002,33.3984375L190.10930000000002,33.3984375M200.10930000000002,33.3984375C200.10930000000002,37.92953615152419 198.8778541664462,42.37544634630052 196.54662314281362,46.260831385688164L185.71590171779823,44.00503921779821C188.52894739451875,41.19199354107769 190.10930000000002,37.37668484759316 190.10930000000002,33.3984375M196.54662314281362,46.260831385688164C195.49497057659744,48.01358566271515 194.23232773365078,49.630748825676605 192.7869695296637,51.07610702966369L185.71590171779823,44.00503921779821"],["fill","rgba(0,0,0,0.1)"]]},{"type":"item","tagName":"path","props":[["d","M140.72853047033632,51.07610702966369C142.1738886743234,52.52146523365077 143.79105183728487,53.784108076597406 145.54380611431185,54.835760642813604L147.7995982822018,44.00503921779821M145.54380611431185,54.835760642813604C149.4291911536995,57.166991666446194 153.87510134847582,58.3984375 158.4062,58.3984375L158.4062,48.3984375C154.42795265240684,48.3984375 150.61264395892232,46.818084894518734 147.7995982822018,44.00503921779821M158.4062,48.3984375L175.10930000000002,48.3984375L175.10930000000002,58.3984375L158.4062,58.3984375M175.10930000000002,58.3984375C179.6403986515242,58.3984375 184.08630884630054,57.166991666446194 187.97169388568818,54.835760642813604L185.71590171779823,44.00503921779821C182.9028560410777,46.818084894518734 179.0875473475932,48.3984375 175.10930000000002,48.3984375M187.97169388568818,54.835760642813604C189.72444816271516,53.784108076597406 191.34161132567664,52.52146523365077 192.7869695296637,51.07610702966369L185.71590171779823,44.00503921779821"],["fill","rgba(0,0,0,0.1)"]]},{"type":"item","tagName":"path","props":[["d","M140.72853047033632,7.322330470336315C139.28317226634925,8.767688674323395 138.0205294234026,10.384851837284847 136.96887685718642,12.137606114311838L147.7995982822018,14.393398282201789M136.96887685718642,12.137606114311838C134.63764583355382,16.02299115369948 133.4062,20.468901348475807 133.4062,25L143.4062,25C143.4062,21.02175265240684 144.98655260548128,17.206443958922307 147.7995982822018,14.393398282201789M133.4062,25L143.4062,25L143.4062,33.3984375L133.4062,33.3984375M133.4062,33.3984375C133.4062,37.92953615152419 134.63764583355382,42.37544634630052 136.96887685718642,46.260831385688164L147.7995982822018,44.00503921779821C144.98655260548128,41.19199354107769 143.4062,37.37668484759316 143.4062,33.3984375M136.96887685718642,46.260831385688164C138.0205294234026,48.01358566271515 139.28317226634925,49.630748825676605 140.72853047033632,51.07610702966369L147.7995982822018,44.00503921779821"],["fill","rgba(0,0,0,0.1)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",153.4062],["y",34.484375],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"123"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom","defs":[]}')
      .end();
  }
};
