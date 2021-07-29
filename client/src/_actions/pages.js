import * as API from '../_api/pages';

export const getPage = (slug) => async (dispatch) => {
  const { data } = await API.getPage(slug);
  dispatch({ type: 'GET_PAGE', payload: data });
};
