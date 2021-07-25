import * as API from '../_api/page';

export const createPage = (pageData) => async (dispatch) => {
  const { data, status } = await API.createPage(pageData);
};

export const getPages = () => async (dispatch) => {
  const { data, status } = await API.getPages();
  dispatch({ type: 'GET_PAGES', payload: data });
};

export const updatePage = (updatedPageData) => async (dispatch) => {
  const { status } = await API.updatePage(updatedPageData);
  if (status === 200) {
    dispatch(getPages());
  }
};

export const deletePage = (id) => async (dispatch) => {
  const { status } = await API.deletePage(id);
  if (status === 200) {
    dispatch(getPages());
  }
};
