let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoCAYAAAB65WHVAAAAAXNSR0IArs4c6QAADW9JREFUeF7t1MFpA0EABMG9yG1nZkcmRWC4R8MNovQ+Rkvt0tfxI0CAAIFJgWvyVA5FgAABAkegPQICBAiMCgj06MU4FgECBATaGyBAgMCogECPXoxjESBAQKC9AQIECIwKCPToxTgWAQIEBNobIECAwKiAQI9ejGMRIEBAoL0BAgQIjAoI9OjFOBYBAgQE2hsgQIDAqIBAj16MYxEgQECgvQECBAiMCgj06MU4FgECBATaGyBAgMCogECPXoxjESBAQKC9AQIECIwKCPToxTgWAQIEBNobIECAwKiAQI9ejGMRIEBAoL0BAgQIjAoI9OjFOBYBAgQE2hsgQIDAqIBAj16MYxEgQECgvQECBAiMCgj06MU4FgECBATaGyBAgMCogECPXoxjESBAQKC9AQIECIwKCPToxTgWAQIEBNobIECAwKiAQI9ejGMRIEBAoL0BAgQIjAoI9OjFOBYBAgQE2hsgQIDAqIBAj16MYxEgQECgvQECBAiMCgj06MU4FgECBATaGyBAgMCogECPXoxjESBAQKC9AQIECIwKCPToxTgWAQIEBNobIECAwKiAQI9ejGMRIEBAoL0BAgQIjAoI9OjFOBYBAgQE2hsgQIDAqIBAj16MYxEgQECgvQECBAiMCnxUoF/nvG44f1/n/Nz4zicECBB4VECgH+X35wQIEPhfQKC9DgIECIwKCPToxTgWAQIEBNobIECAwKiAQI9ejGMRIEBAoL0BAgQIjAoI9OjFOBYBAgQE2hsgQIDAqMCnBfrrhvPvdc7fje98QoAAgUcFPirQj0r6cwIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAICHYOaI0CAQCUg0JWkHQIECMQCAh2DmiNAgEAlINCVpB0CBAjEAgIdg5ojQIBAJSDQlaQdAgQIxAJvA+EfaeEpy3gAAAAASUVORK5CYII=')
      .end();
  }
};
