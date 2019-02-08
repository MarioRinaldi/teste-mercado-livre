class Header {
  constructor() {
    this.search = () => element(by.css('header input[name="search"]'));
    this.button = () => element(by.css('header button[type="submit"]'));
  }

  makeSearch(text) {
    this.search().sendKeys(text);
    this.button().click();
  }
  clearSearch() {
    this.search().sendKeys('');
  }
}

module.exports = Header;
