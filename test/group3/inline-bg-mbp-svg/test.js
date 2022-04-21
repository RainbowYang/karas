let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M10,10L40,10L40,28.3984375L10,28.3984375L10,10"],["fill","rgba(0,0,0,0.3)"]]}],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M10,11C10,8.238576250846032 12.238576250846032,6 15,6L27.90625,6C30.66767374915397,6 32.90625,8.238576250846032 32.90625,11L32.90625,27.13671875C32.90625,29.89814249915397 30.66767374915397,32.13671875 27.90625,32.13671875L15,32.13671875C12.238576250846032,32.13671875 10,29.89814249915397 10,27.13671875"],["fill","rgba(255,0,0,0.3)"]]},{"type":"item","tagName":"path","props":[["d","M10,11C10,8.238576250846034 12.238576250846034,6 15,6L15,8C12.238576250846034,8 10,9.34314575050762 10,11M15,6L27.90625,6L27.90625,8L15,8M27.90625,6C28.81246973030484,6 29.701651769260103,6.24628916671076 30.478728777137633,6.712535371437279L30.027570343559642,8.878679656440358C29.464961208215538,8.316070521096254 28.701899469518633,8 27.90625,8M30.478728777137633,6.712535371437279C30.82927963254303,6.922865884680518 31.15271226513532,7.1753944532698455 31.441783905932738,7.464466094067262L30.027570343559642,8.878679656440358"],["fill","rgba(0,255,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M31.441783905932738,7.464466094067262C31.730855546730155,7.753537734864679 31.98338411531948,8.076970367456969 32.193714628562724,8.427521222862367L30.027570343559642,8.878679656440358M32.193714628562724,8.427521222862367C32.65996083328924,9.204598230739895 32.90625,10.093780269695161 32.90625,11L30.90625,11C30.90625,10.204350530481367 30.590179478903746,9.441288791784462 30.027570343559642,8.878679656440358M30.90625,11L32.90625,11L32.90625,27.13671875L30.90625,27.13671875M32.90625,27.13671875C32.90625,28.042938480304837 32.65996083328924,28.932120519260103 32.193714628562724,29.709197527137633L30.027570343559642,29.258039093559642C30.590179478903746,28.695429958215538 30.90625,27.932368219518633 30.90625,27.13671875M32.193714628562724,29.709197527137633C31.98338411531948,30.05974838254303 31.730855546730155,30.38318101513532 31.441783905932738,30.672252655932738L30.027570343559642,29.258039093559642"],["fill","rgba(0,255,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M10,27.13671875C10,29.898142499153966 12.238576250846034,32.13671875 15,32.13671875L15,30.13671875C12.238576250846034,30.13671875 10,28.79357299949238 10,27.13671875M15,30.13671875L27.90625,30.13671875L27.90625,32.13671875L15,32.13671875M27.90625,32.13671875C28.81246973030484,32.13671875 29.701651769260103,31.89042958328924 30.478728777137633,31.42418337856272L30.027570343559642,29.258039093559642C29.464961208215538,29.820648228903746 28.701899469518633,30.13671875 27.90625,30.13671875M30.478728777137633,31.42418337856272C30.82927963254303,31.21385286531948 31.15271226513532,30.961324296730155 31.441783905932738,30.672252655932738L30.027570343559642,29.258039093559642"],["fill","rgba(0,255,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M11.464466094067262,7.464466094067262C11.175394453269845,7.753537734864679 10.922865884680519,8.076970367456969 10.71253537143728,8.427521222862367L12.878679656440358,8.878679656440358M10.71253537143728,8.427521222862367C10.246289166710763,9.204598230739895 10,10.093780269695161 10,11L12,11C12,10.204350530481367 12.316070521096254,9.441288791784462 12.878679656440358,8.878679656440358M10,11L12,11L12,27.13671875L10,27.13671875M10,27.13671875C10,28.042938480304837 10.246289166710763,28.932120519260103 10.71253537143728,29.709197527137633L12.878679656440358,29.258039093559642C12.316070521096254,28.695429958215538 12,27.932368219518633 12,27.13671875M10.71253537143728,29.709197527137633C10.922865884680519,30.05974838254303 11.175394453269845,30.38318101513532 11.464466094067262,30.672252655932738L12.878679656440358,29.258039093559642"],["fill","rgba(0,255,0,0.5)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",17],["y",24.484375],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"2"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"},{"bb":[{"type":"item","tagName":"path","props":[["d","M10,38.3984375L40,38.3984375L40,75.1953125L10,75.1953125L10,38.3984375"],["fill","rgba(0,0,0,0.3)"]]}],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M10,39.3984375C10,36.63701375084603 12.238576250846032,34.3984375 15,34.3984375L34.7969,34.3984375L34.7969,60.53515625L15,60.53515625C12.238576250846032,60.53515625 10,58.29657999915397 10,55.53515625"],["fill","rgba(255,0,0,0.3)"]]},{"type":"item","tagName":"path","props":[["d","M11.464466094067262,35.86290359406726C11.753537734864679,35.573831953269845 12.076970367456969,35.32130338468052 12.427521222862367,35.110972871437276L12.878679656440358,37.277117156440355M12.427521222862367,35.110972871437276C13.204598230739897,34.64472666671076 14.09378026969516,34.3984375 15,34.3984375L15,36.3984375C14.204350530481367,36.3984375 13.441288791784462,36.71450802109625 12.878679656440358,37.277117156440355M15,34.3984375L34.7969,34.3984375L34.7969,36.3984375L15,36.3984375"],["fill","rgba(0,255,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M11.464466094067262,59.07069015593274C11.753537734864679,59.359761796730155 12.076970367456969,59.61229036531948 12.427521222862367,59.822620878562724L12.878679656440358,57.656476593559645M12.427521222862367,59.822620878562724C13.204598230739897,60.28886708328924 14.09378026969516,60.53515625 15,60.53515625L15,58.53515625C14.204350530481367,58.53515625 13.441288791784462,58.21908572890375 12.878679656440358,57.656476593559645M15,58.53515625L34.7969,58.53515625L34.7969,60.53515625L15,60.53515625"],["fill","rgba(0,255,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M11.464466094067262,35.86290359406726C11.175394453269845,36.15197523486468 10.922865884680519,36.47540786745697 10.71253537143728,36.82595872286237L12.878679656440358,37.277117156440355M10.71253537143728,36.82595872286237C10.246289166710763,37.6030357307399 10,38.49221776969516 10,39.3984375L12,39.3984375C12,38.60278803048137 12.316070521096254,37.83972629178446 12.878679656440358,37.277117156440355M10,39.3984375L12,39.3984375L12,55.53515625L10,55.53515625M10,55.53515625C10,56.44137598030484 10.246289166710763,57.3305580192601 10.71253537143728,58.10763502713763L12.878679656440358,57.656476593559645C12.316070521096254,57.09386745821554 12,56.33080571951863 12,55.53515625M10.71253537143728,58.10763502713763C10.922865884680519,58.45818588254303 11.175394453269845,58.78161851513532 11.464466094067262,59.07069015593274L12.878679656440358,57.656476593559645"],["fill","rgba(0,255,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M10,52.796875L20.90625,52.796875C23.66767374915397,52.796875 25.90625,55.03545125084603 25.90625,57.796875L25.90625,73.93359375C25.90625,76.69501749915396 23.66767374915397,78.93359375 20.90625,78.93359375L10,78.93359375"],["fill","rgba(255,0,0,0.3)"]]},{"type":"item","tagName":"path","props":[["d","M10,52.796875L20.90625,52.796875L20.90625,54.796875L10,54.796875M20.90625,52.796875C21.81246973030484,52.796875 22.701651769260103,53.04316416671076 23.478728777137633,53.509410371437276L23.027570343559642,55.675554656440355C22.464961208215538,55.11294552109625 21.701899469518633,54.796875 20.90625,54.796875M23.478728777137633,53.509410371437276C23.82927963254303,53.71974088468052 24.15271226513532,53.972269453269845 24.441783905932738,54.26134109406726L23.027570343559642,55.675554656440355"],["fill","rgba(0,255,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M24.441783905932738,54.26134109406726C24.730855546730155,54.55041273486468 24.98338411531948,54.87384536745697 25.19371462856272,55.22439622286237L23.027570343559642,55.675554656440355M25.19371462856272,55.22439622286237C25.659960833289237,56.0014732307399 25.90625,56.89065526969516 25.90625,57.796875L23.90625,57.796875C23.90625,57.00122553048137 23.590179478903746,56.23816379178446 23.027570343559642,55.675554656440355M23.90625,57.796875L25.90625,57.796875L25.90625,73.93359375L23.90625,73.93359375M25.90625,73.93359375C25.90625,74.83981348030484 25.659960833289237,75.72899551926011 25.19371462856272,76.50607252713763L23.027570343559642,76.05491409355965C23.590179478903746,75.49230495821554 23.90625,74.72924321951864 23.90625,73.93359375M25.19371462856272,76.50607252713763C24.98338411531948,76.85662338254303 24.730855546730155,77.18005601513532 24.441783905932738,77.46912765593274L23.027570343559642,76.05491409355965"],["fill","rgba(0,255,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M10,76.93359375L20.90625,76.93359375L20.90625,78.93359375L10,78.93359375M20.90625,78.93359375C21.81246973030484,78.93359375 22.701651769260103,78.68730458328923 23.478728777137633,78.22105837856272L23.027570343559642,76.05491409355965C22.464961208215538,76.61752322890375 21.701899469518633,76.93359375 20.90625,76.93359375M23.478728777137633,78.22105837856272C23.82927963254303,78.01072786531948 24.15271226513532,77.75819929673015 24.441783905932738,77.46912765593274L23.027570343559642,76.05491409355965"],["fill","rgba(0,255,0,0.5)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",17],["y",52.8828125],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"22"},{"type":"item","tagName":"text","props":[["x",10],["y",71.28125],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"2"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"},{"bb":[{"type":"item","tagName":"path","props":[["d","M10,85.1953125L40,85.1953125L40,140.390625L10,140.390625L10,85.1953125"],["fill","rgba(0,0,0,0.3)"]]}],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M10,86.1953125C10,83.43388875084604 12.238576250846032,81.1953125 15,81.1953125L34.7969,81.1953125L34.7969,107.33203125L15,107.33203125C12.238576250846032,107.33203125 10,105.09345499915396 10,102.33203125"],["fill","rgba(255,0,0,0.3)"]]},{"type":"item","tagName":"path","props":[["d","M10,81.1953125L34.7969,81.1953125L34.7969,107.33203125L10,107.33203125L10,81.1953125"],["fill","#FFF"],["filter","url(#karas-defs-0-0)"],["clip-path","url(#karas-defs-0-1)"]]},{"type":"item","tagName":"path","props":[["d","M11.464466094067262,82.65977859406726C11.753537734864679,82.37070695326985 12.076970367456969,82.11817838468052 12.427521222862367,81.90784787143728L12.878679656440358,84.07399215644035M12.427521222862367,81.90784787143728C13.204598230739897,81.44160166671077 14.09378026969516,81.1953125 15,81.1953125L15,83.1953125C14.204350530481367,83.1953125 13.441288791784462,83.51138302109625 12.878679656440358,84.07399215644035M15,81.1953125L34.7969,81.1953125L34.7969,83.1953125L15,83.1953125"],["fill","rgba(0,255,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M11.464466094067262,105.86756515593274C11.753537734864679,106.15663679673015 12.076970367456969,106.40916536531948 12.427521222862367,106.61949587856272L12.878679656440358,104.45335159355965M12.427521222862367,106.61949587856272C13.204598230739897,107.08574208328923 14.09378026969516,107.33203125 15,107.33203125L15,105.33203125C14.204350530481367,105.33203125 13.441288791784462,105.01596072890375 12.878679656440358,104.45335159355965M15,105.33203125L34.7969,105.33203125L34.7969,107.33203125L15,107.33203125"],["fill","rgba(0,255,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M11.464466094067262,82.65977859406726C11.175394453269845,82.94885023486468 10.922865884680519,83.27228286745697 10.71253537143728,83.62283372286237L12.878679656440358,84.07399215644035M10.71253537143728,83.62283372286237C10.246289166710763,84.39991073073989 10,85.28909276969516 10,86.1953125L12,86.1953125C12,85.39966303048136 12.316070521096254,84.63660129178446 12.878679656440358,84.07399215644035M10,86.1953125L12,86.1953125L12,102.33203125L10,102.33203125M10,102.33203125C10,103.23825098030484 10.246289166710763,104.12743301926011 10.71253537143728,104.90451002713763L12.878679656440358,104.45335159355965C12.316070521096254,103.89074245821554 12,103.12768071951864 12,102.33203125M10.71253537143728,104.90451002713763C10.922865884680519,105.25506088254303 11.175394453269845,105.57849351513532 11.464466094067262,105.86756515593274L12.878679656440358,104.45335159355965"],["fill","rgba(0,255,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M10,104.59375C10,101.83232625084604 12.238576250846032,99.59375 15,99.59375L27.7969,99.59375L27.7969,125.73046875L15,125.73046875C12.238576250846032,125.73046875 10,123.49189249915396 10,120.73046875"],["fill","rgba(255,0,0,0.3)"]]},{"type":"item","tagName":"path","props":[["d","M10,99.59375L27.7969,99.59375L27.7969,125.73046875L10,125.73046875L10,99.59375"],["fill","#FFF"],["filter","url(#karas-defs-0-2)"],["clip-path","url(#karas-defs-0-3)"]]},{"type":"item","tagName":"path","props":[["d","M10,99.59375L12,99.59375L12,101.59375L10,99.59375M12,99.59375L27.7969,99.59375L27.7969,101.59375L12,101.59375"],["fill","rgba(0,255,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M10,125.73046875L12,123.73046875L12,125.73046875L10,125.73046875M12,123.73046875L27.7969,123.73046875L27.7969,125.73046875L12,125.73046875"],["fill","rgba(0,255,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M10,117.9921875L20.90625,117.9921875C23.66767374915397,117.9921875 25.90625,120.23076375084604 25.90625,122.9921875L25.90625,139.12890625C25.90625,141.89032999915398 23.66767374915397,144.12890625 20.90625,144.12890625L10,144.12890625"],["fill","rgba(255,0,0,0.3)"]]},{"type":"item","tagName":"path","props":[["d","M10,117.9921875L25.90625,117.9921875L25.90625,144.12890625L10,144.12890625L10,117.9921875"],["fill","#FFF"],["filter","url(#karas-defs-0-4)"],["clip-path","url(#karas-defs-0-5)"]]},{"type":"item","tagName":"path","props":[["d","M10,117.9921875L20.90625,117.9921875L20.90625,119.9921875L10,119.9921875M20.90625,117.9921875C21.81246973030484,117.9921875 22.701651769260103,118.23847666671077 23.478728777137633,118.70472287143728L23.027570343559642,120.87086715644035C22.464961208215538,120.30825802109625 21.701899469518633,119.9921875 20.90625,119.9921875M23.478728777137633,118.70472287143728C23.82927963254303,118.91505338468052 24.15271226513532,119.16758195326985 24.441783905932738,119.45665359406726L23.027570343559642,120.87086715644035"],["fill","rgba(0,255,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M24.441783905932738,119.45665359406726C24.730855546730155,119.74572523486468 24.98338411531948,120.06915786745697 25.19371462856272,120.41970872286237L23.027570343559642,120.87086715644035M25.19371462856272,120.41970872286237C25.659960833289237,121.19678573073989 25.90625,122.08596776969516 25.90625,122.9921875L23.90625,122.9921875C23.90625,122.19653803048136 23.590179478903746,121.43347629178446 23.027570343559642,120.87086715644035M23.90625,122.9921875L25.90625,122.9921875L25.90625,139.12890625L23.90625,139.12890625M25.90625,139.12890625C25.90625,140.03512598030483 25.659960833289237,140.9243080192601 25.19371462856272,141.70138502713763L23.027570343559642,141.25022659355963C23.590179478903746,140.68761745821553 23.90625,139.92455571951862 23.90625,139.12890625M25.19371462856272,141.70138502713763C24.98338411531948,142.05193588254303 24.730855546730155,142.37536851513534 24.441783905932738,142.66444015593274L23.027570343559642,141.25022659355963"],["fill","rgba(0,255,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M10,142.12890625L20.90625,142.12890625L20.90625,144.12890625L10,144.12890625M20.90625,144.12890625C21.81246973030484,144.12890625 22.701651769260103,143.88261708328923 23.478728777137633,143.41637087856273L23.027570343559642,141.25022659355963C22.464961208215538,141.81283572890374 21.701899469518633,142.12890625 20.90625,142.12890625M23.478728777137633,143.41637087856273C23.82927963254303,143.2060403653195 24.15271226513532,142.95351179673014 24.441783905932738,142.66444015593274L23.027570343559642,141.25022659355963"],["fill","rgba(0,255,0,0.5)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",17],["y",99.6796875],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"22"},{"type":"item","tagName":"text","props":[["x",10],["y",118.078125],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"22"},{"type":"item","tagName":"text","props":[["x",10],["y",136.4765625],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"2"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom","defs":[{"tagName":"filter","props":[["x",-0.4839314591743323],["y",-0.4591241966821103],["width",1.9678629183486644],["height",1.9182483933642205]],"children":[{"tagName":"feDropShadow","props":[["dx",0],["dy",0],["stdDeviation",2.5],["flood-color","rgba(0,0,255,1)"]]}],"id":0,"uuid":"karas-defs-0-0","index":0},{"tagName":"clipPath","children":[{"tagName":"path","props":[["d","M10,81.1953125L34.7969,81.1953125L34.7969,107.33203125L10,107.33203125L10,81.1953125M0,71.1953125L0,117.33203125L44.7969,117.33203125L44.7969,71.1953125L0,71.1953125"],["fill","#FFF"]]}],"id":1,"uuid":"karas-defs-0-1","index":1},{"tagName":"filter","props":[["x",-0.6742747332400586],["y",-0.4591241966821103],["width",2.348549466480117],["height",1.9182483933642205]],"children":[{"tagName":"feDropShadow","props":[["dx",0],["dy",0],["stdDeviation",2.5],["flood-color","rgba(0,0,255,1)"]]}],"id":2,"uuid":"karas-defs-0-2","index":2},{"tagName":"clipPath","children":[{"tagName":"path","props":[["d","M10,99.59375L27.7969,99.59375L27.7969,125.73046875L10,125.73046875L10,99.59375M0,89.59375L0,135.73046875L37.7969,135.73046875L37.7969,89.59375L0,89.59375"],["fill","#FFF"]]}],"id":3,"uuid":"karas-defs-0-3","index":3},{"tagName":"filter","props":[["x",-0.7544204322200393],["y",-0.4591241966821103],["width",2.508840864440079],["height",1.9182483933642205]],"children":[{"tagName":"feDropShadow","props":[["dx",0],["dy",0],["stdDeviation",2.5],["flood-color","rgba(0,0,255,1)"]]}],"id":4,"uuid":"karas-defs-0-4","index":4},{"tagName":"clipPath","children":[{"tagName":"path","props":[["d","M10,117.9921875L25.90625,117.9921875L25.90625,144.12890625L10,144.12890625L10,117.9921875M0,107.9921875L0,154.12890625L35.90625,154.12890625L35.90625,107.9921875L0,107.9921875"],["fill","#FFF"]]}],"id":5,"uuid":"karas-defs-0-5","index":5}]}')
      .end();
  }
};
