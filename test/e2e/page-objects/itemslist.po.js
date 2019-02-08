class ItemsList {
  constructor() {
    this.mensagemFalha = () => element(by.css('.itemsList > p'));
    this.getItems = () => element(by.css('.itemsList')).all(by.css('.item'));
    this.getItem = (pos) => {
      const item = element(by.css('.itemsList')).all(by.css('.item')).get(pos);
      const title = item.element(by.css('.item__description__title'));
      const price = item.element(by.css('.item__description__price'));
      const city = item.element(by.css('.item__city'));
      return {title, price, city};
    };
  }

  makeSearch(text) {
    this.search().sendKeys(text);
    this.button().click();
  }
  emptySearch() {
    this.search().sendKeys('');
  }

  static visit(q) {
    browser.get(`/items?search=${q}`);
  }
}

module.exports = ItemsList;
