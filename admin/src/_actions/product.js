import * as API from '../_api/product';

export const createProduct = (proData) => async (dispatch) => {
  const { data, status } = await API.createProduct(proData);
  if (status === 200) {
    dispatch(getProducts());
  }
};

export const getProducts = () => async (dispatch) => {
  const { data } = await API.getProducts();
  dispatch({ type: 'GET_PRODUCTS', payload: data });
};

export const updateProduct = (proData) => async (dispatch) => {
  const { data, status } = await API.updateProduct(proData);
  if (status === 200) {
    dispatch(getProducts());
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  const { data, status } = await API.deleteProduct(id);
  if (status === 200) {
    dispatch(getProducts());
  }
};
