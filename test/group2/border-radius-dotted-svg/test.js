let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M19.999999999999996,20C20.41653958144449,19.37519062783325 19.999999999999996,20 19.999999999999996,20L26.755656755403244,26.75565675540325C26.755656755403244,26.75565675540325 28.550437498671556,23.87215893019723 26.755656755403244,26.75565675540325M25.66489208923658,12.6432023716185C28.07274861068892,9.960162247714479 30.587412602608392,7.679928517290392 33.183180150092184,5.82580884051626L33.69396638504444,17.817590580623985C31.397916592229215,20.123890595728568 29.2036328576873,22.91217510967367 27.140249849616843,26.14542259106979M44.3226704419634,0.6467327343595741C46.207446861957045,0.21592669550389587 48.10295476750219,1.4210854715202004e-14 50,0L50,10C48.10724524304653,9.999999999999986 46.21687736377847,10.3022746948008 44.34314575050762,10.904545570495003M50,0L54.285714285714285,0L54.285714285714285,10L50,10M66.42857142857143,0L76.42857142857143,0L76.42857142857143,10L66.42857142857143,10M88.57142857142857,0L98.57142857142857,0L98.57142857142857,10L88.57142857142857,10M110.71428571428571,0L120.71428571428571,0L120.71428571428571,10L110.71428571428571,10M132.85714285714286,0L142.85714285714286,0L142.85714285714286,10L132.85714285714286,10M155,0L165,0L165,10L155,10M177.14285714285714,0L187.14285714285714,0L187.14285714285714,10L177.14285714285714,10M199.28571428571428,0L209.28571428571428,0L209.28571428571428,10L199.28571428571428,10M221.42857142857142,0L231.42857142857142,0L231.42857142857142,10L221.42857142857142,10M243.57142857142856,0L253.57142857142856,0L253.57142857142856,10L243.57142857142856,10M265.7142857142857,0L270,0L270,10L265.7142857142857,10M270,0C271.8970452324978,1.4210854715202004e-14 273.792553138043,0.21592669550389587 275.6773295580366,0.6467327343595741L275.65685424949237,10.904545570495017C273.78312263622155,10.3022746948008 271.8927547569535,9.999999999999986 270,10M286.81681984990786,5.825808840516274C289.41258739739163,7.679928517290421 291.9272513893111,9.960162247714493 294.33510791076344,12.643202371618528L292.8597501503832,26.145422591069817C290.7963671423127,22.912175109673697 288.6020834077708,20.123890595728582 286.3060336149556,17.817590580624014M300,20C300,20 299.5834604185555,19.37519062783325 300,20L293.24434324459673,26.75565675540325C291.44956250132844,23.87215893019723 293.24434324459673,26.75565675540325 293.24434324459673,26.75565675540325"],["fill","rgba(0,0,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M300,20C302.59511340764425,23.89267011146633 304.99465813201516,28.281195325881313 307.1647073123583,33.10352683775503L298.2842712474619,36.36038969321072C296.72484505797047,32.85168076685498 295.0391239878651,29.639154580609258 293.24434324459673,26.75565675540325M309.4524320345865,38.56692726042964C310.1214807357458,40.28558447441697 310.7622747941324,42.04750133335205 311.37378871958794,43.849858166273535L301.93906088626863,45.817664567937136C301.40001581960007,44.209040605826196 300.8371170967527,42.641594003595635 300.25131610873285,41.117974002644964M313.67839881419076,51.32978417847317C314.3236286261245,53.64599375977387 314.9225435813001,56.01261060701462 315.47372377929,58.42402397322055L305.6631547237031,59.24210888719648C305.1538721669036,56.98614631137402 304.60253271882226,54.77951112486358 304.01060586751447,52.62808468453343M317.4001988684352,68.17415218833636C317.89042069165777,71.09462262455585 318.3129035463699,74.05883925131107 318.666295656548,77.0573177619131L308.6948889352098,77.1976547346085C308.3540359710361,74.26941790602532 307.9477424545285,71.38173657219374 307.47755756428427,68.5456213299757M319.6766336328202,88.64534088392682C319.86498433317746,91.94147814017839 319.971204063265,95.25431958224557 319.9948987399755,98.57157432171498L309.99496189934393,98.57160850359486C309.9715861131262,95.25809080722725 309.86688908503186,91.95000705657391 309.681349168812,88.6624716660537M310,110.71428571428571L320,110.71428571428571L320,120.71428571428571L310,120.71428571428571M310,132.85714285714286L320,132.85714285714286L320,142.85714285714286L310,142.85714285714286M310,155L320,155L320,165L310,165M310,177.14285714285714L320,177.14285714285714L320,187.14285714285714L310,187.14285714285714M310,199.28571428571428L320,199.28571428571428L320,209.28571428571428L310,209.28571428571428M319.9948987399755,221.428425678285C319.971204063265,224.74568041775441 319.86498433317746,228.0585218598216 319.6766336328202,231.35465911607318L309.681349168812,231.3375283339463C309.86688908503186,228.04999294342608 309.9715861131262,224.74190919277274 309.99496189934393,221.4283914964051M318.666295656548,242.9426822380869C318.3129035463699,245.9411607486889 317.89042069165777,248.90537737544415 317.4001988684352,251.82584781166364L307.47755756428427,251.45437867002428C307.94774245452857,248.61826342780623 308.3540359710361,245.73058209397465 308.6948889352098,242.8023452653915M315.47372377929,261.5759760267795C314.9225435813001,263.9873893929854 314.3236286261245,266.3540062402261 313.67839881419076,268.6702158215268L304.01060586751447,267.3719153154666C304.6025327188222,265.2204888751364 305.1538721669036,263.013853688626 305.6631547237031,260.7578911128035M311.37378871958794,276.1501418337265C310.7622747941324,277.95249866664795 310.1214807357458,279.71441552558304 309.4524320345865,281.4330727395704L300.25131610873285,278.8820259973551C300.8371170967527,277.3584059964044 301.40001581960007,275.7909593941738 301.93906088626863,274.18233543206287M307.1647073123583,286.896473162245C304.99465813201516,291.7188046741187 302.59511340764425,296.1073298885337 300,300L293.24434324459673,293.24434324459673C295.0391239878651,290.3608454193907 296.72484505797047,287.148319233145 298.2842712474619,283.6396103067893"],["fill","rgba(0,0,255,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M19.999999999999996,300C20.41653958144449,300.62480937216674 19.999999999999996,300 19.999999999999996,300L26.755656755403244,293.24434324459673C26.755656755403244,293.24434324459673 28.550437498671556,296.1278410698028 26.755656755403244,293.24434324459673M25.66489208923658,307.3567976283815C28.07274861068892,310.0398377522855 30.587412602608392,312.32007148270964 33.183180150092184,314.1741911594837L33.69396638504444,302.18240941937603C31.397916592229215,299.87610940427146 29.2036328576873,297.0878248903263 27.140249849616843,293.8545774089302M44.3226704419634,319.3532672656404C46.207446861957045,319.78407330449613 48.10295476750219,320 50,320L50,310C48.10724524304653,310 46.21687736377847,309.6977253051992 44.34314575050762,309.095454429505M50,310L54.285714285714285,310L54.285714285714285,320L50,320M66.42857142857143,310L76.42857142857143,310L76.42857142857143,320L66.42857142857143,320M88.57142857142857,310L98.57142857142857,310L98.57142857142857,320L88.57142857142857,320M110.71428571428571,310L120.71428571428571,310L120.71428571428571,320L110.71428571428571,320M132.85714285714286,310L142.85714285714286,310L142.85714285714286,320L132.85714285714286,320M155,310L165,310L165,320L155,320M177.14285714285714,310L187.14285714285714,310L187.14285714285714,320L177.14285714285714,320M199.28571428571428,310L209.28571428571428,310L209.28571428571428,320L199.28571428571428,320M221.42857142857142,310L231.42857142857142,310L231.42857142857142,320L221.42857142857142,320M243.57142857142856,310L253.57142857142856,310L253.57142857142856,320L243.57142857142856,320M265.7142857142857,310L270,310L270,320L265.7142857142857,320M270,320C271.8970452324978,320 273.792553138043,319.78407330449613 275.6773295580366,319.3532672656404L275.65685424949237,309.09545442950497C273.78312263622155,309.6977253051992 271.8927547569535,310 270,310M286.81681984990786,314.1741911594837C289.41258739739163,312.3200714827096 291.9272513893111,310.0398377522855 294.33510791076344,307.35679762838146L292.8597501503832,293.8545774089302C290.7963671423127,297.0878248903263 288.6020834077708,299.8761094042714 286.3060336149556,302.182409419376M300,300C300,300 299.5834604185555,300.62480937216674 300,300L293.24434324459673,293.24434324459673C291.44956250132844,296.1278410698028 293.24434324459673,293.24434324459673 293.24434324459673,293.24434324459673"],["fill","rgba(255,0,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M19.999999999999996,20C17.404886592355773,23.89267011146633 15.005341867984853,28.281195325881313 12.835292687641683,33.10352683775503L21.7157287525381,36.36038969321072C23.275154942029545,32.85168076685498 24.960876012134936,29.639154580609258 26.755656755403244,26.75565675540325M10.547567965413535,38.56692726042964C9.87851926425418,40.28558447441697 9.23772520586759,42.04750133335205 8.626211280412086,43.849858166273535L18.060939113731365,45.817664567937136C18.59998418039992,44.209040605826196 19.162882903247308,42.641594003595635 19.74868389126714,41.117974002644964M6.32160118580925,51.32978417847317C5.676371373875483,53.64599375977387 5.077456418699924,56.01261060701462 4.526276220709995,58.42402397322055L14.336845276296913,59.24210888719648C14.846127833096347,56.98614631137402 15.39746728117776,54.77951112486358 15.989394132485522,52.62808468453343M2.5998011315647958,68.17415218833636C2.1095793083422407,71.09462262455585 1.6870964536300974,74.05883925131107 1.3337043434519984,77.0573177619131L11.30511106479019,77.1976547346085C11.645964028963895,74.26941790602532 12.05225754547147,71.38173657219374 12.522442435715732,68.5456213299757M0.32336636717978706,88.64534088392682C0.13501566682256083,91.94147814017839 0.028795936734994143,95.25431958224557 0.005101260024495957,98.57157432171498L10.005038100656037,98.57160850359486C10.0284138868738,95.25809080722725 10.133110914968142,91.95000705657391 10.31865083118798,88.6624716660537M0,110.71428571428571L10,110.71428571428571L10,120.71428571428571L0,120.71428571428571M0,132.85714285714286L10,132.85714285714286L10,142.85714285714286L0,142.85714285714286M0,155L10,155L10,165L0,165M0,177.14285714285714L10,177.14285714285714L10,187.14285714285714L0,187.14285714285714M0,199.28571428571428L10,199.28571428571428L10,209.28571428571428L0,209.28571428571428M0.005101260024495957,221.428425678285C0.028795936734994143,224.74568041775441 0.13501566682256083,228.0585218598216 0.32336636717978706,231.35465911607318L10.318650831187973,231.3375283339463C10.133110914968142,228.04999294342608 10.0284138868738,224.74190919277274 10.005038100656037,221.4283914964051M1.3337043434519984,242.9426822380869C1.6870964536300974,245.9411607486889 2.1095793083422407,248.90537737544415 2.5998011315647958,251.82584781166364L12.522442435715725,251.45437867002428C12.052257545471463,248.61826342780623 11.645964028963888,245.73058209397465 11.305111064790182,242.8023452653915M4.526276220709995,261.5759760267795C5.077456418699924,263.9873893929854 5.676371373875483,266.3540062402261 6.32160118580925,268.6702158215268L15.989394132485529,267.3719153154666C15.397467281177768,265.2204888751364 14.846127833096347,263.013853688626 14.33684527629692,260.7578911128035M8.626211280412086,276.1501418337265C9.23772520586759,277.95249866664795 9.87851926425418,279.71441552558304 10.547567965413542,281.4330727395704L19.74868389126715,278.8820259973551C19.16288290324731,277.3584059964044 18.599984180399936,275.7909593941738 18.060939113731365,274.18233543206287M12.835292687641683,286.896473162245C15.005341867984853,291.7188046741187 17.404886592355773,296.1073298885337 19.999999999999996,300L26.755656755403244,293.24434324459673C24.960876012134936,290.3608454193907 23.275154942029545,287.148319233145 21.7157287525381,283.6396103067893"],["fill","rgba(0,255,0,0.5)"]]}],"children":[],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom","defs":[]}')
      .end();
  }
};
