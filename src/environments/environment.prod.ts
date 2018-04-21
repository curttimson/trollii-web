export const environment = {
  production: true,
  version: require('../../package.json').version,
  webUrl: 'https://app.trollii.com',
  serviceUrl: 'https://trollii-prod.herokuapp.com',
  googleAnalyticsKey: 'UA-116772216-2',
  auth0: {
    domain: 'curt.auth0.com',
    clientId: 'OUaEBHkqGtDklsNqkheqVCxRhWXjBreF',
    callbackURL: 'https://app.trollii.com/login-callback',
    audience: 'https://trollii.com/'
  }
};
