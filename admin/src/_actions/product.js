import * as API from '../_api/product';

export const getProducts = () => async (dispatch) => {
  const { data } = await API.getProducts();
  dispatch({ type: 'GET_PRODUCTS', payload: data });
};

export const createProduct = (proData) => async (dispatch) => {
  const { data, status } = await API.createProduct(proData);
  if (status === 200) {
    dispatch(getProducts());
  }
};
