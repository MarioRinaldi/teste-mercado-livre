const { currency } = require('../helpers');
const itemsService = require('../services/items');

const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT');
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
};

const error405 = (req, res, next) => {
  res.status(405).json({ code: 405, message: 'METHOD NOT ALLOWED' });
};

const getItems = (req, res, next) => {
  const { q } = req.query;
  const { limit } = req.query;

  return itemsService.getItems(q).then(response => {
    if (response.status === 200) {
      const { results, filters } = response.data;
      const items = results.slice(0, limit || results.length).map(result => ({
        id: result.id,
        title: result.title,
        price: {
          currency: result.currency_id,
          amount: parseInt(currency.getAmount(result.price), 10),
          decimals: parseInt(currency.getCents(result.price), 10)
        },
        picture: result.thumbnail,
        condition: result.condition,
        free_shipping: result.shipping.free_shipping,
        city: result.address ? result.address.city_name : ''
      }));

      const categoryList = filters.find(filter => filter.id === 'category').values;
      const categories = categoryList[0]
        ? categoryList[0].path_from_root.map(categoryItem => categoryItem.name)
        : [];

      res.status(200).json({
        author: {
          name: 'Mario',
          lastname: 'Rinaldi'
        },
        categories,
        items
      });
    } else {
      res.status(response.status).json({ code: response.status, message: response.statusText });
    }
  }).catch(error => {
    res.status(500).json({ code: 500, message: 'INTERNAL SERVER ERROR', errorMsg: error });
  });
};

const getItem = (req, res, next) => {
  const { id } = req.params;
  itemsService.getItem(id).then(response => {
    if (response.status === 200) {
      const item = {
        id: response.data.id,
        title: response.data.title,
        price: {
          currency: response.data.currency_id,
          amount: parseInt(currency.getAmount(response.data.price), 10),
          decimals: parseInt(currency.getCents(response.data.price), 10)
        },
        picture: response.data.pictures && response.data.pictures[0] ? response.data.pictures[0].url : '',
        condition: response.data.condition,
        free_shipping: response.data.shipping && response.data.shipping.free_shipping,
        sold_quantity: response.data.sold_quantity,
        description: response.data.description
      };

      res.status(200).json({
        author: {
          name: 'Mario',
          lastname: 'Rinaldi'
        },
        categories: response.data.categories,
        item
      });
    } else {
      res.status(response.status).json({ code: response.status, message: response.statusText });
    }
  }).catch(error => {
    res.status(500).json({ code: 500, message: 'INTERNAL SERVER ERROR', errorMsg: error });
  });
};

module.exports = {
  cors,
  error405,
  getItems,
  getItem
};
