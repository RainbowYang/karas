let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoCAYAAAB65WHVAAAAAXNSR0IArs4c6QAAGP1JREFUeF7t3XuQnXV5wPFncyFXEhMMIZd6AZESKeWiSPEGKOm0BW2xtQiM13aUKujYjq0wbUel463qiIpYa9ERUMYbOCAElIvcBMULCIIK4RICSGIgCcEkm93OWcxCIOQ8ydnXJ7772X86Lc/+nvN+3tPvnDnZPdsXvgh0ERiMODgiLgU1ogIH90VcPqInOqx1An2tuyIXNOICAj3ipJ0DBboR1nYdKtDtup+NXI1AN8Iq0I2wtutQgW7X/WzkagS6EVaBboS1XYcKdLvuZyNXI9CNsAp0I6ztOlSg23U/G7kagW6EVaAbYW3XoQLdrvvZyNUIdCOsAt0Ia7sOFeh23c9GrkagG2EV6EZY23WoQLfrfjZyNQLdCKtAN8LarkMFul33s5Gruffoo9/QP3366X2Dg42c//s4dPyyZTHrnHOir7//97Eus0OgM0qjfEagR/kTIHP5P77ggqtmnXvuQRPvuSczvl3OPHDEETH/k5+MqTfeuL08PoHeXu7Edvw4BHo7vjnby0P7yXnnXbrbe95z8HYUt62mue0DH4jZZ50l0Fst5xsqBQS6Uv8PZLdAN3KjvIJuhLVdhwp0u+5nI1cj0I2wCnQjrO06VKDbdT8buRqBboRVoBthbdehAt2u+9nI1Qh0I6wC3Qhruw4V6Hbdz0auRqAbYRXoRljbdahAt+t+NnI1Av1k1tU7z4wlL1gQK3adF6t3nhHrJ02IGNMX49asjckrVsaMO+6NOT/5Rcy8bclT3ROBbuTZ2q5DBbpd97ORqxHox1jXTZkUP/vbQ2Pp/numrKffeW/s8+VFsePSZU+cF+iU4OgeEujRff9TV18d6N8eeGAsO+mkWLdgwdDj3eHmm2PGKafElIsvTj3+ztBI/Bz02mlT4urj/z4enj3zsb0DAzHt3mUx8cHVEYODsXbHybFq3qwYGDdueGbsuvXxwlO/FjNv3+QXfQQ6ffdG76BAj957n77yykA/fNhhcf9pp232sc5697tjx69/PXUdIxHoa9/66nhgwbOH9z3jqp/GHt++KiasWrPJY+ifsEMsftl+cetfHhQxZszQf5vw0Oo49OTPx9i16zfOCnTqzo3uIYEe3fc/dfVVgR6YNi3uuvzy6PzPzX2NWbky5h9xRIxb8pTv8w5/W6+BfugZu8QV/3Ls8Hnzr7sp9jnjgi36/eoVB8Qtr3zp8MxeX/tuPOt7Pxbo1LPOUEdAoD0PugpUBbrz1sbSM8/c4uPLvoruNdC/XHhg3Hr4i4cfy8s++IXNva+8yWPdsMP4uPBDb4/BsWOH/u+zf3ZbvOB/vinQXZ9xBjYKCLTnQleBqkCvevWr44EPf3iLj6/zXvSMT3yi6zX0Gugb/+7lcedL9h3e81fv/Fj0DQx03XvJv7851syaMTQ3/a774iX/fYZAd1UzINCeA2mBqkBnXkHPPeaYmPj973e9ll4D/fNXvTRue/kBw3v+/F8/GeMfWdt178Xvf2usnT51aG7mr+6Og045W6C7qhkQaM+BtEBVoDsPcMl558W6PTf/I23j7rkn5h9+eHTei+721Wugl+67R/zojUcMrznoE1/Z0s84D811/rHwwg8dP/Tz0Z2vXb/7g1hw7uUC3e1m+e/DAt7i8GToKlAZ6P7582PpWWdF/7x5mzzOMatWxdyjjx76kbvMV6+BHhg/Lr7zn/8Y66ZNGVo36+bF8cLPfj1iC3/D4FeHvTBuOeIljz68gcE4+INfiKn3LRfozA0zMyQg0J4IXQV6CfTg1KnRt3p11x1bGuj8FEfn/ejOj9x1viZde21MP/301Cvnjef2GujOOfftvXv88M2vjOh79P9tOv/o97xvXBqTlz24ycPvn7hD3Hbo8+OXC/9s+NXz7ouuiT3Ov+rxc37Mrqdnxej4ZoEeHfe5p6vc1kAPTp4cdy1aFDufeGJMuuKKnh5Dr988EoHuPIal++0RNxy1MPonThh+SFPvXx4TV6wa+kfDdVMnx8p5s4Z/cqNvw0DsftH347kXXP3ESxDoXm/qKPh+gR4FN7nXS9zWQK945ztjxfHHR/T3x87veldMPf/8Xh/KNn//SAW68wA6v+59+yH7x+2HPD86b31s9mtwMDo/K73HBVfHpN9s9j1ygd7muzl6vlGgR8+93uYr3ZZAb5g5c+iXTDqvooe+Bgdjp/e+N6Z/6Uvb/Dh6+caRCvQjM6fFza96Wdz7p7sP/5bglh5X5zM4Or9tuMsNv/QKupcbOEq/V6BH6Y3fmsvelkAvO/nkWPna1z5pzdNOOy1mfuQjW7N+RGZHItC/2XVeXPfWI4ff3thh9ZrY9dIfDr0XPbnzKnlgMNbtODmWP+ePYvFL943Obx9u/NrtO9fFnt/63uOvxSvoEbmz7T5EoNt9f0fk6rY20Ot33TXu3sIHGe149tkx68QTt/jY1u61V6zdd9+YNkKvuHsN9G+nT43L/+31sX7KpKHHPW3J/XHgqV+LHVY/svnr6Iu46W8OicUH7z/83/f94nkx7/pbNv7vAj0iz852HyLQ7b6/I3J1Wxvo+z7zmVizcOEWd0++5JKY/ba3Rd+6dU+ae+TAA+O+z31u6O2RGZ/6VMz4+Md7vo5eA33ja14Rd754n6HH0bdhQxxy8v/F5OUPbflx9fXFFe86Oh565pyhuUnLH4pD3/+/0Tcw9LN5At3zXW3/AQLd/nvc8xVuTaB/u99+sfSrX03tnHD99THn9a+PMY889ir04YUL4/5TTokYP374jB2/8pV4+kkn9fQzob0EenBMXyz64NuH39rY5ae/iOd//lupa7zroL2Hfupj49eLPnbm0If5C3SKb9QPCfSofwp0B9iaQC8599xYt9de3Q/93cQON90Uc173uhj74IOx6sgjH/3sjd/9nPHjD5m8aFHMPuGE6OvvT5/9+MFeAr16l53ishPfOHzcnudcHrtd8oPU43jip+A97hPtvIJOCY7uIYEe3fc/dfXZQG/ps5u3tGj84sUx5cIL48Hjjtvi45l05ZWxy3HHRd+aTT9/OXMRvQT6N7vNj6vfcdTwmr2/vCiecc2NmbWxevbMuOykNw3PPvfbV8VzL7zGK+iUniGB9hzoKpAJ9OCYMbHkooti/bMf+0D7rgdvw8DjX3Fvzbf3EugnvgpecM5lseslP0ytf/CZu8SV//zY50gv+OZlQz/54S2OFN+oHxLoUf8U6A6QCfTKY46JZe97X/fDRmBi3B13xNyjjopxDzyQPq2XQHf+jNXF//VPw7vmX/uz2OfMC1O7lxzwvPjJsX8xPLv/6d+KOT/+hUCn9AwJtOdAV4FugR6YNOnRv3yy005dzxqpgbFLl8bcY4+N8XfemTqyl0B3Flx60puG/xbh+IcfiVf8x2dj7Pru74f/4B/+Ou7f+znDj/Gwk07d+CeyvAedunOje0igR/f9T119t0CveMc7YsUJJ6TOGsmhMStWDP0D44TEJ9r1Gugn/vmqzp+u6vyD35a+fr3g2XHdW44c/kfPnW+6PQ747Dc2fotAj+SToaVnCXRLb+xIXla3QN91xRXRP3fuSK5Mn9X38MOxy1veEpOuGfqHt6f86jXQnT9f1flFlTVPf9rwjjk/ujX++PwrY8oDKzbZu2HC+LjjRfvErYe/aPive4/p748Xf/SsmHbPrwU6fXcNCrTnQFeBboG+85prYsPOO3c9p7GB9euHfgRvykUXNRbozsGrZ+8UVx//muHPhN64rPMLKJNWrIwx/RuGPs1u1Zydhj/NrjPT+US7zh+YnXf9zx//+LyCbuwJ0Z6DBbo997KxK9nuA9258sHBGPoDst8YfgthE49eX0FvPGzttClxw2sOi/v/ZLfN/rz2E29C58OS9j77opixeOkT/5NAN/aMbc/BAt2ee9nYlfxBBPp3Vz/zox+Np5166pMsRirQGw9eNefpQ58NvXy3+UNve6yfPDEGxoyJ8Wt+GxNXro6Zty+N2TfdHrNuWfxUf3VFoBt7xrbnYIFuz71s7Eq6Bfr+T386Nsx49C9Xbw9f07/4xZiyaFEjr6BH8PoEegQx23qUQLf1zo7gdXUL9AiuauyokX4FPQIPVKBHALHtRwh02+/wCFyfQI8A4pOPEOhGWNt1qEC36342cjUC3QirQDfC2q5DBbpd97ORqxHoRlgFuhHWdh0q0O26n41cjUA3wirQjbC261CBbtf9bORqBLoRVoFuhLVdhwp0u+5nI1cj0I2wCnQjrO06VKDbdT8buRqBboRVoBthbdehAt2u+9nI1dxwxhlnjdmw4bVjN/MHXhtZ2MShAwPxrJNPjol3393E6dtypkBvi9oo+x6BHmU3fFsud/3cuQsHIjb91bxtOajwe/rWro3xy5cXPoInrRbo7elubKePRaC30xuzPT2swYiDO59Zvz09phY8FoFuwU1s+hIEumnhFpwv0I3cRIFuhLVdhwp0u+5nI1cj0I2wCnQjrO06VKDbdT8buRqBboRVoBthbdehAt2u+9nI1Qh0I6wC3Qhruw4V6Hbdz0auRqAbYRXoRljbdahAt+t+NnI1At0Iq0A3wtquQwW6XfezkasR6EZYBboR1nYdKtDtup+NXM1gxLMi4g2NHD56Dz29L+LO0Xv5rjwjINAZJTMECBAoEBDoAnQrCRAgkBEQ6IySGQIECBQICHQBupUECBDICAh0RskMAQIECgQEugDdSgIECGQEBDqjZIYAAQIFAgJdgG4lAQIEMgICnVEyQ4AAgQIBgS5At5IAAQIZAYHOKJkhQIBAgYBAF6BbSYAAgYyAQGeUzBAgQKBAQKAL0K0kQIBARkCgM0pmCBAgUCAg0AXoVhIgQCAjINAZJTMECBAoEBDoAnQrCRAgkBEQ6IySGQIECBQICHQBupUECBDICAh0RskMAQIECgQEugDdSgIECGQEBDqjZIYAAQIFAgJdgG4lAQIEMgICnVEyQ4AAgQIBgS5At5IAAQIZAYHOKJkhQIBAgYBAF6BbSYAAgYyAQGeUzBAgQKBAQKAL0K0kQIBARkCgM0pmCBAgUCAg0AXoVhIgQCAjINAZJTMECBAoEBDoAnQrCRAgkBEQ6IySGQIECBQICHQBupUECBDICAh0RskMAQIECgQEugDdSgIECGQEBDqjZIYAAQIFAgJdgG4lAQIEMgICnVEyQ4AAgQIBgS5At5IAAQIZAYHOKJkhQIBAgYBAF6BbSYAAgYyAQGeUzBAgQKBAQKAL0K0kQIBARkCgM0pmCBAgUCAg0AXoVhIgQCAjINAZJTMECBAoEBDoAnQrCRAgkBEQ6IySGQIECBQICHQBupUECBDICAh0RskMAQIECgQEugDdSgIECGQEBDqjZIYAAQIFAgJdgG4lAQIEMgICnVEyQ4AAgQIBgS5At5IAAQIZAYHOKJkhQIBAgYBAF6BbSYAAgYyAQGeUzBAgQKBAQKAL0K0kQIBARkCgM0pmCBAgUCAg0AXoVhIgQCAjINAZJTMECBAoEBDoAnQrCRAgkBEQ6IySGQIECBQICHQBupUECBDICAh0RskMAQIECgQEugDdSgIECGQEBDqjZIYAAQIFAgJdgG4lAQIEMgICnVEyQ4AAgQIBgS5At5IAAQIZAYHOKJkhQIBAgYBAF6BbSYAAgYyAQGeUzBAgQKBAQKAL0K0kQIBARkCgM0pmCBAgUCAg0AXoVhIgQCAjINAZJTMECBAoEBDoAnQrCRAgkBEQ6IySGQIECBQICHQBupUECBDICAh0RskMAQIECgQEugDdSgIECGQEBDqjZIYAAQIFAgJdgG4lAQIEMgICnVEyQ4AAgQIBgS5At5IAAQIZAYHOKJkhQIBAgYBAF6BbSYAAgYyAQGeUzBAgQKBAQKAL0K0kQIBARkCgM0pmCBAgUCAg0AXoVhIgQCAjINAZJTMECBAoEBDoAnQrCRAgkBEQ6IySGQIECBQICHQBupUECBDICAh0RskMAQIECgQEugDdSgIECGQEBDqjZIYAAQIFAgJdgG4lAQIEMgICnVEyQ4AAgQIBgS5At5IAAQIZAYHOKJkhQIBAgYBAF6BbSYAAgYyAQGeUzBAgQKBAQKAL0K0kQIBARkCgM0pmCBAgUCAg0AXoVhIgQCAjINAZJTMECBAoEBDoAnQrCRAgkBEQ6IySGQIECBQICHQBupUECBDICAh0RskMAQIECgQEugDdSgIECGQEBDqjZIYAAQIFAgJdgG4lAQIEMgICnVEyQ4AAgQIBgS5At5IAAQIZAYHOKJkhQIBAgYBAF6BbSYAAgYyAQGeUzBAgQKBAQKAL0K0kQIBARkCgM0pmCBAgUCAg0AXoVhIgQCAjINAZJTMECBAoEBDoAnQrCRAgkBEQ6IySGQIECBQICHQBupUECBDICAh0RskMAQIECgQEugDdSgIECGQEBDqjZIYAAQIFAgJdgG4lAQIEMgICnVEyQ4AAgQIBgS5At5IAAQIZAYHOKJkhQIBAgYBAF6BbSYAAgYyAQGeUzBAgQKBAQKAL0K0kQIBARkCgM0pmCBAgUCAg0AXoVhIgQCAjINAZJTMECBAoEBDoAnQrCRAgkBEQ6IySGQIECBQICHQBupUECBDICAh0RskMAQIECgQEugDdSgIECGQEBDqjZIYAAQIFAgJdgG4lAQIEMgICnVEyQ4AAgQIBgS5At5IAAQIZAYHOKJkhQIBAgYBAF6BbSYAAgYyAQGeUzBAgQKBAQKAL0K0kQIBARkCgM0pmCBAgUCAg0AXoVhIgQCAjINAZJTMECBAoEBDoAnQrCRAgkBEQ6IySGQIECBQICHQBupUECBDICAh0RskMAQIECgQEugDdSgIECGQEBDqjZIYAAQIFAgJdgG4lAQIEMgICnVEyQ4AAgQIBgS5At5IAAQIZAYHOKJkhQIBAgYBAF6BbSYAAgYyAQGeUzBAgQKBAQKAL0K0kQIBARkCgM0pmCBAgUCAg0AXoVhIgQCAjINAZJTMECBAoEBDoAnQrCRAgkBEQ6IySGQIECBQICHQBupUECBDICAh0RskMAQIECgQEugDdSgIECGQEBDqjZIYAAQIFAgJdgG4lAQIEMgICnVEyQ4AAgQIBgS5At5IAAQIZAYHOKJkhQIBAgYBAF6BbSYAAgYyAQGeUzBAgQKBAQKAL0K0kQIBARkCgM0pmCBAgUCAg0AXoVhIgQCAjINAZJTMECBAoEBDoAnQrCRAgkBEQ6IySGQIECBQICHQBupUECBDICAh0RskMAQIECgQEugDdSgIECGQEBDqjZIYAAQIFAgJdgG4lAQIEMgICnVEyQ4AAgQIBgS5At5IAAQIZAYHOKJkhQIBAgYBAF6BbSYAAgYyAQGeUzBAgQKBAQKAL0K0kQIBARkCgM0pmCBAgUCAg0AXoVhIgQCAjINAZJTMECBAoEBDoAnQrCRAgkBEQ6IySGQIECBQICHQBupUECBDICAh0RskMAQIECgQEugDdSgIECGQEBDqjZIYAAQIFAgJdgG4lAQIEMgICnVEyQ4AAgQIBgS5At5IAAQIZAYHOKJkhQIBAgYBAF6BbSYAAgYyAQGeUzBAgQKBAQKAL0K0kQIBARkCgM0pmCBAgUCAg0AXoVhIgQCAjINAZJTMECBAoEBDoAnQrCRAgkBEQ6IySGQIECBQICHQBupUECBDICAh0RskMAQIECgQEugDdSgIECGQEBDqjZIYAAQIFAgJdgG4lAQIEMgICnVEyQ4AAgQIBgS5At5IAAQIZAYHOKJkhQIBAgYBAF6BbSYAAgYyAQGeUzBAgQKBAQKAL0K0kQIBARkCgM0pmCBAgUCAg0AXoVhIgQCAjINAZJTMECBAoEBDoAnQrCRAgkBEQ6IySGQIECBQICHQBupUECBDICAh0RskMAQIECgQEugDdSgIECGQEBDqjZIYAAQIFAgJdgG4lAQIEMgICnVEyQ4AAgQIBgS5At5IAAQIZAYHOKJkhQIBAgYBAF6BbSYAAgYyAQGeUzBAgQKBAQKAL0K0kQIBARkCgM0pmCBAgUCAg0AXoVhIgQCAjINAZJTMECBAoEBDoAnQrCRAgkBEQ6IySGQIECBQICHQBupUECBDICAh0RskMAQIECgQEugDdSgIECGQEBDqjZIYAAQIFAgJdgG4lAQIEMgICnVEyQ4AAgQIBgS5At5IAAQIZAYHOKJkhQIBAgYBAF6BbSYAAgYyAQGeUzBAgQKBAQKAL0K0kQIBARkCgM0pmCBAgUCAg0AXoVhIgQCAjINAZJTMECBAoEBDoAnQrCRAgkBEQ6IySGQIECBQICHQBupUECBDICAh0RskMAQIECgQEugDdSgIECGQEBDqjZIYAAQIFAgJdgG4lAQIEMgICnVEyQ4AAgQIBgS5At5IAAQIZAYHOKJkhQIBAgYBAF6BbSYAAgYyAQGeUzBAgQKBAQKAL0K0kQIBARkCgM0pmCBAgUCAg0AXoVhIgQCAjINAZJTMECBAoEBDoAnQrCRAgkBEQ6IySGQIECBQICHQBupUECBDICAh0RskMAQIECgQEugDdSgIECGQEBDqjZIYAAQIFAv8PuYfgpYDCy5gAAAAASUVORK5CYII=')
      .end();
  }
};
