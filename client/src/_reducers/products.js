const initState = { products: [], isFetching: false };
export const productReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_RPODUCTS_REQUEST':
      return { ...state, isFetching: true };
    case 'GET_RPODUCTS':
      return { ...state, products: action.payload, isFetching: false };

    default:
      return state;
  }
};
