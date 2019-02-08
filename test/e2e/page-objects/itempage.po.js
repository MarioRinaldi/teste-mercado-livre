class ItemPage {
  constructor() {
    this.mensagemFalha = () => element(by.css('p.h1'));
    this.getItem = () => {
      const title = element(by.css('.title'));
      const price = element(by.css('.price'));
      const condition = element(by.css('.condition'));
      return { title, price, condition };
    }
  }

  makeSearch(text) {
    this.search().sendKeys(text);
    this.button().click();
  }
  emptySearch() {
    this.search().sendKeys('');
  }

  static visit(id) {
    console.log('id', id);
    browser.get(`/items/${id}`);
  }
}

module.exports = ItemPage;
