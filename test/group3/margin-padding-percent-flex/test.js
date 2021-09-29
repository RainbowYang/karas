let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoCAYAAAB65WHVAAAAAXNSR0IArs4c6QAADqtJREFUeF7t2q+qrwkZhuF3isgYTIJg0GgdbAqCTcWDUKw2QYwTLB6FwSpoEI2CoEnxDEQFk0EsEyxjcAaGDQM3a1gP68+12968az3f7/oWNzust84fAgQIEHiSAm89yafyUAQIECBwAu2HgAABAk9U4M1Af/3uvnEn3E/0fXksAgRersD7d/e7u/v9hx/xzUC/+4W7d75699mXa+CTESBA4OkJ/PHuP/+8+8vdvfuxgf7W3Vd+c/edp/f4nogAAQIvV+Dbd7/+7d2fBfrlvmOfjACBZyog0M/0xXlsAgRevoBAv/x37BMSIPBMBQT6mb44j02AwMsXEOiX/459QgIEnqnAJw70L+7u+x/8ovSvnimCxyZAgMBTFHhwoP97dz+8u5/f/39B+p27E+in+Io9EwECz1XgwYH+09197+5+eXc/uLtPC/Rz/Rnw3AQIPFGBBwf633f3qbv7zN19U6Cf6Ov1WAQIPGeBBwf6ox9aoJ/zj4BnJ0DgqQoI9FN9M56LAIFXLyDQr/5HAAABAk9VQKCf6pvxXAQIvHoBgX71PwIACBB4qgIC/VTfjOciQODVCzw40H+9u398wPejD37l7icf/P3Ld/f5V08LgAABAp9M4MGB/vHd/fRjtn92d9/9ZM/lqwkQIPDqBR4c6FcvB4AAAQKPLCDQjwzs2xMgQOChAgL9UDlfR4AAgUcWEOhHBvbtCRAg8FABgX6onK8jQIDAIwsI9CMD+/YECBB4qIBAP1TO1xEgQOCRBVKg37772tt3n3vkZ/HtCRAgQOAjAu/d/eu9uz/c3bsf/vNbbwh98e6+dHdv/jtIAgQIEHhcgffv7m939/ePC/TjzvvuBAgQIJAF/E85UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFZAoLfe1ggQIJAFBDpTOSRAgMBWQKC33tYIECCQBQQ6UzkkQIDAVkCgt97WCBAgkAUEOlM5JECAwFbgf++No2ky3HYgAAAAAElFTkSuQmCC')
      .end();
  }
};
