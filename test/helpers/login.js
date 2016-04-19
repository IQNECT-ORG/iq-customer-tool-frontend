var LoginPage = require('../pages/login.page');

module.exports = {
  login: function() {
    LoginPage.open();
    browser.waitForExist("#email", 20000);
    LoginPage.email.setValue(process.env.E2E_USER_EMAIL);
    LoginPage.password.setValue(process.env.E2E_USER_PASSWORD);
    LoginPage.submit();
    browser.waitUntil(function() {
      return browser.getUrl().then(function(url) {
        return url !== browser.options.baseUrl + '/signin';
      });
    }, 20000);
  }
};