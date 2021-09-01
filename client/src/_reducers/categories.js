const initState = { categories: [], isFetching: false };
export const categoriesReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES_REQUEST':
      return { ...state, isFetching: true };
    case 'GET_CATEGORIES':
      return { ...state, categories: action.payload, isFetching: false };
    default:
      return state;
  }
};
