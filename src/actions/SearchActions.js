
import axios from 'axios';

const { api_url } = require('../../package.json');

const termoBusca = (payload = '') => {
  console.log('SearchActions -> termoBusca', payload);
  return { type: 'SEARCH_TERM', payload };
};

const buscaItems = (text) => {
  console.log('SearchActions -> busca', text);
  // return { type: 'SEARCH_ITEMS', payload };
  return dispatch => {
    axios.get(`${api_url}/?q=${text}&limit=4`).then(response => {
      if (response.status === 200) {
        const payload = {
          term: text,
          items:  response.data.items,
          breadcrumb: response.data.categories ? response.data.categories.join(' > ') : ''
        };
        return dispatch({ type: 'SEARCH_ITEMS', payload });
      }
    }).catch(() => {

    });
  }
};

const buscaItem = (id) => {
  return dispatch => {
    axios.get(`${api_url}/${id}`).then(response => {
      if (response.status === 200) {
        const payload = {
          item:  response.data.item,
          breadcrumb: response.data.categories ? response.data.categories.join(' > ') : ''
        };
        return dispatch({ type: 'SEARCH_ITEM', payload });
      }
    });
  }
};

export {
  termoBusca,
  buscaItems,
  buscaItem
};

