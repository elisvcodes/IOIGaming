export const getCart = () => (dispatch) => {
  dispatch({ type: 'GET_CART' });
};
export const addToCart = (item) => (dispatch) => {
  dispatch({ type: 'ADD_TO_CART', payload: item });
};
