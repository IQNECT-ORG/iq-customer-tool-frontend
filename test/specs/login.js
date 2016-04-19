var LoginPage = require('../pages/login.page');

describe('Login', function() {
  it('should go to dashboard after successful login', function() {
    LoginPage.open();
    browser.waitForExist("#email", 10000);
    LoginPage.email.setValue(process.env.E2E_USER_EMAIL);
    LoginPage.password.setValue(process.env.E2E_USER_PASSWORD);
    LoginPage.submit();
    browser.waitUntil(function() {
      return browser.getUrl().then(function(url) {
        return url !== browser.options.baseUrl + '/signin';
      });
    }, 10000);
    browser.getUrl().should.be.equal(browser.options.baseUrl + '/');
  });

  it('should show error message after invalid credentials', function() {
    LoginPage.open();
    browser.waitForExist("#email", 10000);
    LoginPage.email.setValue('notarealuser@example.com');
    LoginPage.password.setValue('invalidpassword');
    LoginPage.submit();
    browser.waitForExist('.alert-danger', 10000);
    browser.element('.alert-danger').getAttribute('data-alert-name').should.be.equal('NotFoundError');
  });
});