import * as API from '../_api/products';

export const getProductsByCat = (slug) => async (dispatch) => {
  dispatch({ type: 'GET_RPODUCTS_BY_CAT_REQUEST' });
  const { data, status } = await API.getProductsByCat(slug);
  if (status === 200) {
    dispatch({ type: 'GET_RPODUCTS_BY_CAT', payload: data });
  }
};
