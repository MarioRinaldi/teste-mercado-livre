const axios = require('axios');

const MELI_API_URL = 'https://api.mercadolibre.com';

const itemsService = {
  getItems: q => axios.get(`${MELI_API_URL}/sites/MLA/search/`, {
    params: {
      q
    }
  }),

  getItem: id => {
    const getItemDetail = () => axios.get(`${MELI_API_URL}/items/${id}`);
    const getItemDescription = () => axios.get(`${MELI_API_URL}/items/${id}/description`);
    const getItemCategory = categoryId => axios.get(`${MELI_API_URL}/categories/${categoryId}`);

    return axios.all([getItemDetail(), getItemDescription()])
      .then(axios.spread((detail, description) => {
        const obj = {
          ...detail,
          data: {
            ...detail.data,
            description: description.status === 200 ? description.data.plain_text : ''
          }
        };
        return getItemCategory(detail.data.category_id).then(categoriesResponse => {
          const categoriesData = categoriesResponse.data.path_from_root;
          const categories = categoriesData.map(categoryItem => categoryItem.name);
          const { data } = obj;
          return { ...obj, data: { ...data, categories } };
        }).catch(() => obj);
      }));
  }
};

module.exports = itemsService;
