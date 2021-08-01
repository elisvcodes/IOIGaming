import * as API from '../_api/products';

export const getProductsByCat = (slug) => async (dispatch) => {
  const { data } = await API.getProductsByCat(slug);
  dispatch({ type: 'GET_RPODUCTS_BY_CAT', payload: data });
};
