var path = require('path');
var loginHelper = require('../helpers/login');

describe('Add Brand', function() {
  it('should successfully add new brand', function() {
    loginHelper.login();
    browser.element('[href="/campaign/create"]').click();
    browser.waitForExist('.titlebar button', 20000);
    browser.element('.titlebar button').click();

    browser.waitForExist('.asset-input__input', 20000);
    browser.chooseFile('.asset-input__input', path.resolve(__dirname, '../assets/mI7qPUg.jpg'));
    browser.element('[name="name"]').setValue('Test brand');
    browser.element('[type="submit"]').click();

    browser.waitForExist('.ReactModal__Overlay', 20000, true);
  });
});