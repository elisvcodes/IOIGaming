import * as API from '../_api/pages';

export const getPage = (slug) => async (dispatch) => {
  dispatch({ type: 'GET_PAGE_REQUEST' });
  const { data, status } = await API.getPage(slug);
  if (status === 200) {
    dispatch({ type: 'GET_PAGE', payload: data });
  }
};
