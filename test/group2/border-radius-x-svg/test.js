let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M15,30C15,21.715728752538098 35.147186257614294,15 60,15L210,15C234.8528137423857,15 255,21.715728752538098 255,30L255,200C255,208.2842712474619 234.8528137423857,215 210,215L60,215C35.147186257614294,215 15,208.2842712474619 15,200"],["fill","rgba(255,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M12,12C15.411254969542789,9.725830020304802 19.45166004060961,7.705627484771394 24,6L28.180194846605364,19.393398282201787C25.83298612966079,20.175801187849977 23.752696129460958,21.04237296031659 21.977296157475692,21.9772961574757M24,6C34.38577025077629,2.105336155958895 47.017787186529645,0 60,0L60,15C48.06525795722052,14.999999999999998 36.61933187676692,16.580352605481266 28.180194846605364,19.393398282201787M60,0L210,0L210,15L60,15M210,0C222.98221281347037,0 235.6142297492237,2.105336155958895 246,6L241.81980515339464,19.393398282201787C233.38066812323308,16.580352605481266 221.93474204277948,14.999999999999998 210,15M246,6C250.54833995939038,7.705627484771394 254.5887450304572,9.725830020304802 258,12L248.02270384252432,21.9772961574757C246.24730387053904,21.04237296031659 244.16701387033922,20.175801187849977 241.81980515339464,19.393398282201787"],["fill","rgba(0,0,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M258,12C260.15969761759646,13.439798411730983 262.0558878987316,14.973848573737907 263.6656314599949,16.58359213500126L248.02270384252432,21.9772961574757C248.02270384252432,21.9772961574757 249.79810381450955,22.912219354634804 248.02270384252432,21.9772961574757M263.6656314599949,16.58359213500126C267.8312944948385,20.749255169844808 270,25.342647141365873 270,29.999999999999996L255,30C255,26.02175265240684 250.2589421835562,22.206443958922307 248.02270384252432,21.9772961574757M255,30L270,30L270,200L255,200M270,200C270,204.65735285863414 267.8312944948385,209.25074483015518 263.6656314599949,213.41640786499875L248.02270384252432,208.0227038425243C250.2589421835562,207.7935560410777 255,203.97824734759317 255,200M263.6656314599949,213.41640786499875C262.0558878987316,215.0261514262621 260.15969761759646,216.56020158826902 258,218L248.02270384252432,208.0227038425243C249.79810381450955,207.0877806453652 248.02270384252432,208.0227038425243 248.02270384252432,208.0227038425243"],["fill","rgba(0,0,255,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M12,218C15.411254969542789,220.2741699796952 19.45166004060961,222.29437251522862 24,224L28.180194846605364,210.6066017177982C25.83298612966079,209.82419881215003 23.752696129460958,208.95762703968342 21.977296157475692,208.0227038425243M24,224C34.38577025077629,227.8946638440411 47.017787186529645,230 60,230L60,215C48.06525795722052,215 36.61933187676692,213.41964739451873 28.180194846605364,210.6066017177982M60,215L210,215L210,230L60,230M210,230C222.98221281347037,230 235.6142297492237,227.8946638440411 246,224L241.81980515339464,210.6066017177982C233.38066812323308,213.41964739451873 221.93474204277948,215 210,215M246,224C250.54833995939038,222.29437251522862 254.5887450304572,220.2741699796952 258,218L248.02270384252432,208.0227038425243C246.24730387053904,208.95762703968342 244.16701387033922,209.82419881215003 241.81980515339464,210.6066017177982"],["fill","rgba(255,0,0,0.5)"]]},{"type":"item","tagName":"path","props":[["d","M12,12C9.840302382403522,13.439798411730983 7.944112101268402,14.973848573737907 6.334368540005052,16.58359213500126L21.977296157475692,21.9772961574757C21.977296157475692,21.9772961574757 20.20189618549044,22.912219354634804 21.977296157475692,21.9772961574757M6.334368540005052,16.58359213500126C2.1687055051615047,20.749255169844808 7.105427357601002e-15,25.342647141365873 0,29.999999999999996L15,30C14.999999999999993,26.02175265240684 19.7410578164438,22.206443958922307 21.977296157475692,21.9772961574757M0,30L15,30L15,200L0,200M0,200C7.105427357601002e-15,204.65735285863414 2.1687055051615047,209.25074483015518 6.334368540005052,213.41640786499875L21.977296157475692,208.0227038425243C19.7410578164438,207.7935560410777 14.999999999999993,203.97824734759317 15,200M6.334368540005052,213.41640786499875C7.944112101268402,215.0261514262621 9.840302382403522,216.56020158826902 12,218L21.977296157475692,208.0227038425243C20.20189618549044,207.0877806453652 21.977296157475692,208.0227038425243 21.977296157475692,208.0227038425243"],["fill","rgba(0,255,0,0.5)"]]}],"children":[],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom","defs":[]}')
      .end();
  }
};
