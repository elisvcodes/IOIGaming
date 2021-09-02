import * as API from '../_api/products';

export const getProducts =
  ({ slug, query, priceQuery }) =>
  async (dispatch) => {
    dispatch({ type: 'GET_RPODUCTS_REQUEST' });
    const { data, status } = await API.getProducts({ slug, query, priceQuery });
    if (status === 200) {
      dispatch({ type: 'GET_RPODUCTS', payload: data });
    }
  };
