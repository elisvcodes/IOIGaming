import * as API from '../_api/category';

export const createCategory = (catData) => async (dispatch) => {
  const { data, status } = await API.createCategory(catData);
  if (status === 200) {
    dispatch(getCategories());
  }
};

export const getCategories = () => async (dispatch) => {
  const { data, status } = await API.getCategories();
  dispatch({ type: 'GET_CATEGORIES', payload: data });
};

export const updateCategory = (updatedCatData) => async (dispatch) => {
  const { status } = await API.updateCategory(updatedCatData);
  if (status === 200) {
    dispatch(getCategories());
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  const { status } = await API.deleteCategory(id);
  if (status === 200) {
    dispatch(getCategories());
  }
};
