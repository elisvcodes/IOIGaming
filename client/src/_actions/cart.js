export const getCart = () => (dispatch) => {
  dispatch({ type: 'GET_CART' });
};
export const addToCart = (item) => (dispatch) => {
  dispatch({ type: 'ADD_TO_CART', payload: item });
};
export const incrementItem = (item, quantity, total) => (dispatch) => {
  dispatch({ type: 'INCREMENT', payload: { item, quantity, total } });
};

export const decrementItem = (item, quantity, total) => (dispatch) => {
  dispatch({ type: 'DECREMENT', payload: { item, quantity, total } });
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: 'CLEAR' });
};
