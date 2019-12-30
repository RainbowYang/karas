var path = require('path');
var fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoCAYAAAB65WHVAAAOnUlEQVR4Xu3c225cVxJEQerPPV+ugQY2MDB8oajuZq1k+Fkia0ceLOjJ3978R4AAAQInBb6dvMpRBAgQIPAm0D4CAgQIHBUQ6KPDOIsAAQIC7RsgQIDAUQGBPjqMswgQICDQvgECBAgcFRDoo8M4iwABAgLtGyBAgMBRAYE+OoyzCBAgINC+AQIECBwVEOijwziLAAECAu0bIECAwFEBgT46jLMIECAg0L4BAgQIHBUQ6KPDOIsAAQIC7RsgQIDAUQGBPjqMswgQICDQvgECBAgcFRDoo8M4iwABAgLtGyBAgMBRAYE+OoyzCBAgINC+AQIECBwVEOijwziLAAECAu0bIECAwFEBgT46jLMIECAg0L4BAgQIHBUQ6KPDOIsAAQIC7RsgQIDAUQGBPjqMswgQICDQvgECBAgcFRDoo8M4iwABAgLtGyBAgMBRAYE+OoyzCBAgINC+AQIECBwVEOijwziLAAECAu0bIECAwFEBgT46jLMIECAg0L4BAgQIHBUQ6KPDOIsAAQIC7RsgQIDAUQGBPjqMswgQICDQvgECBAgcFRDoo8M4iwABAgLtGyBAgMBRAYE+OoyzCBAgINC+AQIECBwVEOijwziLAAECAu0bIECAwFEBgT46jLMIECAg0Me+ge9vb799e3v77dhZziFA4BMEBPoT0P/pV35/e/v+9vb2H5E+NoxzCHyCgEB/Avo7Av3jj4j0sW2cQ+DVAgL9avF/+X2//wv6jz8l0sf2cQ6BVwoI9Cu13/G7/hRo/5J+h5k/QmBVQKCPLfsXgRbpYxs5h8CrBAT6VdLv/D1/E2iRfqefP0ZgSUCgj635D4EW6WNbOYfAswUE+tnCP/nz/yXQIv2Tnv44gbKAQB9b7x2BFuljmzmHwLMEBPpZsh/8ue8MtEh/0NdfI1ASEOhja/1EoEX62HbOIfBoAYF+tOgv/ryfDLRI/6K3v07gsoBAH1vnA4EW6WMbOofAowQE+lGSD/o5Hwy0SD/I348hcElAoC+t8fa//5Xdj/+b3Uf/8//u+Kicv0fgoIBAHxvlFwPtX9LH9nQOgV8REOhf0XvC331AoEX6Cbv4kQQ+Q0CgP0P9H37ngwIt0sd2dQ6BjwgI9EfUnvh3HhhokX7iTn40gVcICPQrlH/idzw40CL9E/b+KIFrAgJ9bJEnBFqkj23sHALvFRDo90q96M89KdAi/aL9/BoCjxQQ6EdqPuBnPTHQIv2AffwIAq8UEOhXar/jdz050CL9jg38EQJXBAT6yhK/3/GCQIv0sc2dQ+DvBAT62LfxokCL9LHdnUPgrwQE+th38cJAi/Sx7Z1D4M8CAn3sm3hxoEX62P7OIfD/AgJ97Hv4hECL9LFvwDkE/hAQ6GPfwicFWqSPfQfOIfBDQKCPfQefGGiRPvYtOIeAQB/7Bj450CJ97HtwztcWEOhj+x8ItEgf+yac83UFBPrY9kcCLdLHvgvnfE0BgT62+6FAi/Sxb8M5X09AoI9tfizQIn3s+3DO1xIQ6GN7Hwy0SB/7RpzzdQQE+tjWRwMt0se+E+d8DQGBPrbz4UCL9LFvxTn7AgJ9bOPjgRbpY9+Lc7YFBPrYvoFAi/Sxb8Y5uwICfWzbSKBF+th345xNAYE+tmso0CJ97Ntxzp6AQB/bNBZokT72/ThnS0Cgj+0ZDLRIH/uGnLMjINDHtowGWqSPfUfO2RAQ6GM7hgMt0se+Jef0BQT62IbxQIv0se/JOW0BgT6230CgRfrYN+WcroBAd7dzOQEC4wICPT6w5xEg0BUQ6O52LidAYFxAoMcH9jwCBLoCAt3dzuUECIwLCPT4wJ5HgEBXQKC727mcAIFxAYEeH9jzCBDoCgh0dzuXEyAwLiDQ4wN7HgECXQGB7m7ncgIExgUEenxgzyNAoCsg0N3tXE6AwLiAQI8P7HkECHQFBLq7ncsJEBgXEOjxgT2PAIGugEB3t3M5AQLjAgI9PrDnESDQFRDo7nYuJ0BgXECgxwf2PAIEugIC3d3O5QQIjAsI9PjAnkeAQFdAoLvbuZwAgXEBgR4f2PMIEOgKCHR3O5cTIDAuINDjA3seAQJdAYHubudyAgTGBQR6fGDPI0CgKyDQ3e1cToDAuIBAjw/seQQIdAUEurudywkQGBcQ6PGBPY8Aga6AQHe3czkBAuMCAj0+sOcRINAVEOjudi4nQGBcQKDHB/Y8AgS6AgLd3c7lBAiMCwj0+MCeR4BAV0Cgu9u5nACBcQGBHh/Y8wgQ6AoIdHc7lxMgMC4g0OMDex4BAl0Bge5u53ICBMYFBHp8YM8jQKArINDd7VxOgMC4gECPD+x5BAh0BQS6u53LCRAYFxDo8YE9jwCBroBAd7dzOQEC4wICPT6w5xEg0BUQ6O52LidAYFxAoMcH9jwCBLoCAt3dzuUECIwLCPT4wJ5HgEBXQKC727mcAIFxAYEeH9jzCBDoCgh0dzuXEyAwLiDQ4wN7HgECXQGB7m7ncgIExgUEenxgzyNAoCsg0N3tXE6AwLiAQI8P7HkECHQFBLq7ncsJEBgXEOjxgT2PAIGugEB3t3M5AQLjAgI9PrDnESDQFRDo7nYuJ0BgXECgxwf2PAIEugIC3d3O5QQIjAsI9PjAnkeAQFdAoLvbuZwAgXEBgR4f2PMIEOgKCHR3O5cTIDAuINDjA3seAQJdAYHubudyAgTGBQR6fGDPI0CgKyDQ3e1cToDAuIBAjw/seQQIdAUEurudywkQGBcQ6PGBPY8Aga6AQHe3czkBAuMCAj0+sOcRINAVEOjudi4nQGBcQKDHB/Y8AgS6AgLd3c7lBAiMCwj0+MCeR4BAV0Cgu9u5nACBcQGBHh/Y8wgQ6AoIdHc7lxMgMC4g0OMDex4BAl0Bge5u53ICBMYFBHp8YM8jQKArINDd7VxOgMC4gECPD+x5BAh0BQS6u53LCRAYFxDo8YE9jwCBroBAd7dzOQEC4wICPT6w5xEg0BUQ6O52LidAYFxAoMcH9jwCBLoCAt3dzuUECIwLCPT4wJ5HgEBXQKC727mcAIFxAYEeH9jzCBDoCgh0dzuXEyAwLiDQ4wN7HgECXQGB7m7ncgIExgUEenxgzyNAoCsg0N3tXE6AwLiAQI8P7HkECHQFBLq7ncsJEBgXEOjxgT2PAIGugEB3t3M5AQLjAgI9PrDnESDQFRDo7nYuJ0BgXECgxwf2PAIEugIC3d3O5QQIjAsI9PjAnkeAQFdAoLvbuZwAgXEBgR4f2PMIEOgKCHR3O5cTIDAuINDjA3seAQJdAYHubudyAgTGBQR6fGDPI0CgKyDQ3e1cToDAuIBAjw/seQQIdAUEurudywkQGBcQ6PGBPY8Aga6AQHe3czkBAuMCAj0+sOcRINAVEOjudi4nQGBcQKDHB/Y8AgS6AgLd3c7lBAiMCwj0+MCeR4BAV0Cgu9u5nACBcQGBHh/Y8wgQ6AoIdHc7lxMgMC4g0OMDex4BAl0Bge5u53ICBMYFBHp8YM8jQKArINDd7VxOgMC4gECPD+x5BAh0BQS6u53LCRAYFxDo8YE9jwCBroBAd7dzOQEC4wICPT6w5xEg0BUQ6O52LidAYFxAoMcH9jwCBLoCAt3dzuUECIwLCPT4wJ5HgEBXQKC727mcAIFxAYEeH9jzCBDoCgh0dzuXEyAwLiDQ4wN7HgECXQGB7m7ncgIExgUEenxgzyNAoCsg0N3tXE6AwLiAQI8P7HkECHQFBLq7ncsJEBgXEOjxgT2PAIGugEB3t3M5AQLjAgI9PrDnESDQFRDo7nYuJ0BgXECgxwf2PAIEugIC3d3O5QQIjAsI9PjAnkeAQFdAoLvbuZwAgXEBgR4f2PMIEOgKCHR3O5cTIDAuINDjA3seAQJdAYHubudyAgTGBQR6fGDPI0CgKyDQ3e1cToDAuIBAjw/seQQIdAUEurudywkQGBcQ6PGBPY8Aga6AQHe3czkBAuMCAj0+sOcRINAVEOjudi4nQGBcQKDHB/Y8AgS6AgLd3c7lBAiMCwj0+MCeR4BAV0Cgu9u5nACBcQGBHh/Y8wgQ6AoIdHc7lxMgMC4g0OMDex4BAl0Bge5u53ICBMYFBHp8YM8jQKArINDd7VxOgMC4gECPD+x5BAh0BQS6u53LCRAYFxDo8YE9jwCBroBAd7dzOQEC4wICPT6w5xEg0BUQ6O52LidAYFxAoMcH9jwCBLoCAt3dzuUECIwLCPT4wJ5HgEBXQKC727mcAIFxAYEeH9jzCBDoCgh0dzuXEyAwLiDQ4wN7HgECXQGB7m7ncgIExgUEenxgzyNAoCsg0N3tXE6AwLiAQI8P7HkECHQFBLq7ncsJEBgXEOjxgT2PAIGugEB3t3M5AQLjAgI9PrDnESDQFRDo7nYuJ0BgXECgxwf2PAIEugIC3d3O5QQIjAsI9PjAnkeAQFdAoLvbuZwAgXEBgR4f2PMIEOgKCHR3O5cTIDAuINDjA3seAQJdAYHubudyAgTGBQR6fGDPI0CgKyDQ3e1cToDAuIBAjw/seQQIdAUEurudywkQGBcQ6PGBPY8Aga6AQHe3czkBAuMCAj0+sOcRINAVEOjudi4nQGBcQKDHB/Y8AgS6AgLd3c7lBAiMCwj0+MCeR4BAV0Cgu9u5nACBcQGBHh/Y8wgQ6AoIdHc7lxMgMC4g0OMDex4BAl0Bge5u53ICBMYFBHp8YM8jQKArINDd7VxOgMC4gECPD+x5BAh0BQS6u53LCRAYFxDo8YE9jwCBroBAd7dzOQEC4wICPT6w5xEg0BUQ6O52LidAYFxAoMcH9jwCBLoCAt3dzuUECIwLCPT4wJ5HgEBXQKC727mcAIFxAYEeH9jzCBDoCgh0dzuXEyAwLiDQ4wN7HgECXQGB7m7ncgIExgUEenxgzyNAoCsg0N3tXE6AwLiAQI8P7HkECHQFBLq7ncsJEBgXEOjxgT2PAIGugEB3t3M5AQLjAgI9PrDnESDQFRDo7nYuJ0BgXECgxwf2PAIEugL/BXVmlmlMc+n9AAAAAElFTkSuQmCC')
      .end();
  }
};