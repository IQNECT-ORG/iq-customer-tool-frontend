var LoginPage = require('../pages/login.page');
var loginHelper = require('../helpers/login');

describe('Login', function() {
  it('should go to dashboard after successful login', function() {
    loginHelper.login();
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

  // context('when accessing a secure page', function() {
  //   context('when not logged in', function() {
  //     it('should redirect to signin', function() {
  //       // try access the dashboard
  //       browser.url('/');
  //       browser.waitUntil(function() {
  //         return browser.getUrl().then(function(url) {
  //           return url === '/signin';
  //         });
  //       }, 20000);
  //     });
  //   });
  // });
});