function Page () {
  this.title = '';
}

Page.prototype.open = function (path) {
  browser.url('/' + path);
}

module.exports = new Page();