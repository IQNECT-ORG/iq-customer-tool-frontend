var Page = require('./page')

var LoginPage = Object.create(Page, {
  /**
   * define elements
   */
  email: { get: function () { return browser.element('#email'); } },
  password: { get: function () { return browser.element('#password'); } },
  form: { get: function () { return browser.element('form'); } },

  /**
   * define or overwrite page methods
   */
  open: {
    value: function() {
      Page.open.call(this, 'signin');
    }
  },

  submit: {
    value: function() {
      browser.element('[type="submit"]').click();
    }
  }
});

module.exports = LoginPage