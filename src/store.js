const INITIAL_STATE = { text: '', items: [], item: {}, breadcrumb: '' };

export default function(state = INITIAL_STATE, action) {
  console.log('STORE -> action', action);
  console.log('STORE -> state', state);
  const { text, items, item, breadcrumb } = action.payload || {};

  switch (action.type) {
    case 'SEARCH_ITEMS':
      return { ...state, items, breadcrumb, text };
    case 'SEARCH_ITEM':
      return { ...state, item, breadcrumb };
    case 'SEARCH_BREADCRUMB':
      return { ...state, breadcrumb };
    case 'SEARCH_TERM':
      return { ...state, text, breadcrumb: '' };
    default:
      return state;
  }
}
