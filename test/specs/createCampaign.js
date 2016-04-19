var path = require('path');
var loginHelper = require('../helpers/login');

describe('Create Campaign', function() {
  it('should create campaign', function() {
    loginHelper.login();
    browser.element('[href="/campaign/create"]').click();
    browser.waitForExist('.selector__option', 20000);
    browser.element('.selector__option > button').click();
    // @TODO: This selector is poor
    browser.waitForExist('.selector__option .icons8-questions', 20000);
    browser.element('.selector__option .icons8-questions').click();

    browser.waitForExist('.asset-input__input', 20000);
    browser.chooseFile('.asset-input__input', path.resolve(__dirname, '../assets/pdf-sample.pdf'));
    browser.element('[name="campaignTitle"]').setValue('Test campaign');
    browser.element('[type="submit"]').click();

    browser.waitForExist('h2=All Pages', 20000);
  });
});