import * as API from '../_api/order';

export const getOrders = () => async (dispatch) => {
  dispatch({ type: 'GET_ORDERS_REQUEST' });
  const { data, status } = await API.getOrders();
  if (status === 200) {
    dispatch({ type: 'GET_ORDERS', payload: data });
  }
};
