const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const dataSearch = require('../data/data_search');
const Header = require('../page-objects/header.po.js');
const HomePage = require('../page-objects/homepage.po.js');
const ItemsList = require('../page-objects/itemslist.po.js');
const ItemPage = require('../page-objects/itempage.po.js');

const { expect } = chai;
chai.should();
chai.use(chaiAsPromised);
const header = new Header();
const homePage = new HomePage();
const itemsList = new ItemsList();
const itemPage = new ItemPage();

describe('Make a Search', () => {
  beforeEach('Entrar no site', () => {
    HomePage.visit();
  });

  afterEach('Clear Search Input', () => {
    header.clearSearch();
  });

  it('search invalid text', async () => {
    header.makeSearch(dataSearch.invalidTextSearch);
    const item = itemsList.mensagemFalha();

    expect(item.getText()).to.eventually.equal('Não há anúncios que coincidam com a sua busca.');
  });

  it('search valid text', async () => {
    header.makeSearch(dataSearch.validTextSearch);
    const items = itemsList.getItems();

    expect(items.count()).to.eventually.equal(4);
  });

  it('verify item 1', async () => {
    header.makeSearch(dataSearch.validTextSearch);
    const { title, price, city } = itemsList.getItem(0);

    expect(title.getText()).to.eventually.equal('Apple Ipod Touch 32gb 6ta Gen Nuevos Gtia Escrita');
    expect(price.getText()).to.eventually.equal('ARS 149,99 ');
    expect(city.getText()).to.eventually.equal('Tribunales');
  });

  it('enter on item 1', async () => {
    header.makeSearch(dataSearch.validTextSearch);
    itemsList.getItems().get(0).click();
    const { title, price, condition } = itemPage.getItem();

    expect(title.getText()).to.eventually.equal('Apple Ipod Touch 32gb 6ta Gen Nuevos Gtia Escrita');
    expect(price.getText()).to.eventually.equal('ARS 14999');
    expect(condition.getText()).to.eventually.equal('Nuevo - 3 vendidos');
  });
});

describe('enter on search page', () => {
  beforeEach('Entrar no site', () => {
    HomePage.visit();
  });

  it('invalid text', async () => {
    ItemsList.visit(dataSearch.invalidTextSearch);
    const item = itemsList.mensagemFalha();

    expect(item.getText()).to.eventually.equal('Não há anúncios que coincidam com a sua busca.');
  });

  it('search valid text', async () => {
    ItemsList.visit(dataSearch.validTextSearch);
    const items = itemsList.getItems();

    expect(items.count()).to.eventually.equal(4);
  });

  it('verify item 1', async () => {
    ItemsList.visit(dataSearch.validTextSearch);
    const { title, price, city } = itemsList.getItem(0);

    expect(title.getText()).to.eventually.equal('Apple Ipod Touch 32gb 6ta Gen Nuevos Gtia Escrita');
    expect(price.getText()).to.eventually.equal('ARS 149,99 ');
    expect(city.getText()).to.eventually.equal('Tribunales');
  });

});


describe('enter on item page', () => {
  beforeEach('Entrar no site', () => {
    HomePage.visit();
  });

  it('enter on item valid', async () => {
    ItemPage.visit(dataSearch.validIdProduct);
    const { title, price, condition } = itemPage.getItem();

    expect(title.getText()).to.eventually.equal('Apple Ipod Touch 32gb 6ta Gen Nuevos Gtia Escrita');
    expect(price.getText()).to.eventually.equal('ARS 14999');
    expect(condition.getText()).to.eventually.equal('Nuevo - 3 vendidos');
  });

  it('enter on item valid', async () => {
    ItemPage.visit(dataSearch.invalidIdProduct);
    const item = itemPage.mensagemFalha();

    expect(item.getText()).to.eventually.equal('Parece que esta página não existe');
  });

});
