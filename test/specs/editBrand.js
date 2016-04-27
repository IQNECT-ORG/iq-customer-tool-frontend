var path = require('path');
var loginHelper = require('../helpers/login');

describe('Edit Brand', function() {
  it('should successfully edit brand', function() {
    loginHelper.login();
    browser.element('.draw-nav__menu .icons8-package').click();
    browser.pause(2000); // wait for the expander to open
    browser.element('[href="/manage/brands"]').click();
    browser.waitForExist('.brand-selector .selector__option', 20000);
    browser.element('.brand-selector .selector__option button').click();

    browser.waitForExist('.asset-input__input', 20000);
    browser.element('[name="name"]').setValue('Test brand');
    browser.element('[type="submit"]').click();

    browser.waitForExist('.ReactModal__Overlay', 20000, true);
  });
});