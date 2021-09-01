import * as API from '../_api/categories';

export const getCategories = () => async (dispatch) => {
  dispatch({ type: 'GET_CATEGORIES_REQUEST' });
  const { data, status } = await API.getCategories();
  if (status === 200) {
    dispatch({ type: 'GET_CATEGORIES', payload: data });
  }
};
