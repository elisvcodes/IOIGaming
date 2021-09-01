const initState = { categories: [], fetching: false };
export const categoriesReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES_REQUEST':
      return { ...state, fetching: true };
    case 'GET_CATEGORIES':
      return { ...state, categories: action.payload, fetching: false };
    default:
      return state;
  }
};
