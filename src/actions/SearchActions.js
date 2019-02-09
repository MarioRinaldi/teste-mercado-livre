
import axios from 'axios';

const { apiURL } = require('../../package.json');

const termoBusca = (payload = '') => {
  console.log('SearchActions -> termoBusca', payload);
  return { type: 'SEARCH_TERM', payload };
};

const buscaItems = text => dispatch => axios.get(`${apiURL}/?q=${text}&limit=4`).then(response => {
  if (response.status === 200) {
    const payload = {
      text,
      items: response.data.items,
      breadcrumb: response.data.categories ? response.data.categories.join(' > ') : ' '
    };
    return dispatch({ type: 'SEARCH_ITEMS', payload });
  }
  return dispatch({ type: 'SEARCH_ITEMS', payload: { items: [], text, breadcrumb: ' ' } });
}).catch(() => dispatch({ type: 'SEARCH_ITEMS', payload: { items: [], text, breadcrumb: ' ' } }));

const buscaItem = id => dispatch => axios.get(`${apiURL}/${id}`).then(response => {
  if (response.status === 200 && response.data) {
    const payload = {
      item: response.data.item,
      breadcrumb: response.data.categories ? response.data.categories.join(' > ') : ''
    };
    return dispatch({ type: 'SEARCH_ITEM', payload });
  }
  return dispatch({ type: 'SEARCH_ITEM', payload: { item: {}, breadcrumb: '' } });
});

export {
  termoBusca,
  buscaItems,
  buscaItem
};
