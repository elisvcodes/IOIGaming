import * as API from '../_api/categories';

export const getCategories = () => async (dispatch) => {
  const { data } = await API.getCategories();
  dispatch({ type: 'GET_CATEGORIES', payload: data });
};
