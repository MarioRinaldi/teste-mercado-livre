const axios = require('axios');
const MELI_API_URL = 'https://api.mercadolibre.com';

const itemsService = {
  getItems: (q) => {
    return axios.get(`${MELI_API_URL}/sites/MLA/search/`, {
      params: {
        q
      }
    });
  },

  getItem: (id) => {
    const getItemDetail = () => {
      return axios.get(`${MELI_API_URL}/items/${id}`);
    };
    const getItemDescription = () => {
      return axios.get(`${MELI_API_URL}/items/${id}/description`);
    };
    const getItemCategory = (category_id) => {
      return axios.get(`${MELI_API_URL}/categories/${category_id}`);
    };

    return axios.all([getItemDetail(), getItemDescription()]).then(axios.spread(function (detail, description) {
      const obj = {
        ...detail,
        data: {
          ...detail.data,
          description: description.status === 200 ? description.data.plain_text : ''
        }
      };
      return getItemCategory(detail.data.category_id).then(categoriesResponse => {
        const categories = categoriesResponse.data.path_from_root.map(categoryItem => categoryItem.name);
        const { data } = obj;
        return {...obj, data: { ...data, categories} };
      }).catch(() => {
        return obj;
      });
    }));
  }
}

module.exports = itemsService;
