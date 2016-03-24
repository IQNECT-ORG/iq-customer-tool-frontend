describe('my awesome website', function() {
  it('should do some chai assertions', function() {
    browser.url('http://webdriver.io');
    browser.getTitle().should.be.equal('WebdriverIO - Selenium 2.0 javascript bindings for nodejs');
  });
});