import axios from 'axios';

export const createCategory = (data) =>
  axios.post(
    `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/category/create`,
    data,
    {
      withCredentials: true,
    }
  );

export const getCategories = () =>
  axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/category`, {
    withCredentials: true,
  });

export const updateCategory = (data) =>
  axios.patch(
    `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/category/update`,
    data,
    {
      withCredentials: true,
    }
  );

export const deleteCategory = (id) =>
  axios.delete(
    `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/category/${id}`,
    {
      withCredentials: true,
    }
  );
