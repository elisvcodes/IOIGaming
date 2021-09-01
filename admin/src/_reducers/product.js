const initState = { products: [], fetching: false };
export const productsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS_REQUEST':
      return { ...state, fetching: true };
    case 'GET_PRODUCTS':
      return { ...state, products: action.payload, fetching: false };

    default:
      return state;
  }
};
