export const getCart = () => (dispatch) => {
  dispatch({ type: 'GET_CART' });
};
export const addToCart = (item) => (dispatch) => {
  dispatch({ type: 'ADD_TO_CART', payload: item });
};
export const incrementItem = (item, quantity) => (dispatch) => {
  dispatch({ type: 'INCREMENT', payload: { item, quantity } });
};

export const decrementItem = (item, quantity) => (dispatch) => {
  dispatch({ type: 'DECREMENT', payload: { item, quantity } });
};
