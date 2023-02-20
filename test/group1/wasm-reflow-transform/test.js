let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .pause(20)
      .assert.value('input', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoCAYAAAB65WHVAAAAAXNSR0IArs4c6QAADplJREFUeF7t3EFOHTEUBVHY/6KTKZOguFXv226djPvfdo6hhBjw/fWSf3++vv685L/yX/+N76+v7/960EMECFwr8JpvcoG+9mvQwQkQ+IeAQF/6peEn6EsvzrEJLAgI9ALWSY8K9Em34SwEZgQEesZ1fFWgx4m9gMB2AYHefgXPDiDQz9x8isBNAgJ90239OKtAX3pxjk1gQUCgF7BOelSgT7oNZyEwIyDQM67jqwI9TuwFBLYLCPT2K3h2AIF+5uZTBG4SEOibbsvvoC+9Lccm8ExAoJ+5bf+Un6C3X4EDEBgXEOhx4pkXCPSMq1UCJwkI9Em3sXAWgV7A8iiBSwUE+t6Le83dXXoFjk1gXOA13+T+mt3414oXECDwYQGB/jB49Tq/4qgk7RA4V0Cgz72bX08m0JdenGMTWBAQ6AWskx4V6JNuw1kIzAgI9Izr+KpAjxN7AYHtAgK9/QqeHUCgn7n5FIGbBAT6ptv6cVaBvvTiHJvAgoBAL2Cd9KhAn3QbzkJgRkCgZ1zHVwV6nNgLCGwXEOjtV/DsAAL9zM2nCNwkINA33ZbfQV96W45N4JmAQD9z2/4pP0FvvwIHIDAuINDjxDMvEOgZV6sEThIQ6JNuY+EsAr2A5VEClwoI9L0X95q7u/QKHJvAuMBrvsn9udHxrxUvIEDgwwIC/WHw6nV+xVFJ2iFwroBAn3s3v55MoC+9OMcmsCAg0AtYJz0q0CfdhrMQmBEQ6BnX8VWBHif2AgLbBQR6+xU8O4BAP3PzKQI3CQj0Tbf146wCfenFOTaBBQGBXsA66VGBPuk2nIXAjIBAz7iOrwr0OLEXENguINDbr+DZAQT6mZtPEbhJQKBvui2/g770thybwDMBgX7mtv1TfoLefgUOQGBcQKDHiWdeINAzrlYJnCQg0CfdxsJZBHoBy6MELhUQ6Hsv7jV3d+kVODaBcYHXfJP7c6PjXyteQIDAhwUE+sPg1ev8iqOStEPgXAGBPvdufj2ZQF96cY5NYEFAoBewTnpUoE+6DWchMCMg0DOu46sCPU7sBQS2C7wm0NslHYAAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAkIdCVphwABArGAQMeg5ggQIFAJCHQlaYcAAQKxgEDHoOYIECBQCQh0JWmHAAECsYBAx6DmCBAgUAn8BZJyZWkQzqvjAAAAAElFTkSuQmCC')
      .end();
  }
};