var path = require('path');
var loginHelper = require('../helpers/login');

function editCampaignViaCatalogue(desiredType) {
  browser.element('.draw-nav__menu .icons8-package').click();
  browser.pause(2000); // wait for the expander to open
  browser.element('[href="/manage/campaigns"]').click();

  browser.waitForExist('.campaign-list__row', 20000);
  const rows = browser.elements('.campaign-list__row');

  rows.value.every(function(row, index) {
    const cells = browser.elementIdElements(row.ELEMENT, '.faux-table__cell');
    const typeCell = cells.value[1];
    const type = browser.elementIdText(typeCell.ELEMENT);

    if(type.value === desiredType) {
      const thumbnailCell = cells.value[0];
      browser.elementIdElement(thumbnailCell.ELEMENT, '.campaign-list__thumbnail').click();
      return false; // We can stop it early
    }

    return true;
  });
}

describe('Edit Campaign', function() {
  // This test isn't working due to a problem with the fixtures.
  describe.skip('Print / PDF', function() {
    it('should edit campaign', function() {
      loginHelper.login();

      editCampaignViaCatalogue('Magazine');

      browser.waitForExist('h2=Campaign Details', 20000);

      browser.element('[name="campaignTitle"]').setValue('A new name');
      browser.element('[type="submit"]').click();

      browser.waitForExist('.ReactModal__Overlay', 20000);
    });
  });

  describe('Image', function() {
    it('should edit campaign', function() {
      loginHelper.login();

      editCampaignViaCatalogue('Image');

      browser.waitForExist('h2=Campaign Details', 20000);

      browser.element('[name="campaignTitle"]').setValue('A new name');
      browser.element('[type="submit"]').click();

      browser.waitForExist('.ReactModal__Overlay', 20000);
    });
  });
});