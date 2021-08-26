import axios from 'axios';

export const createProduct = (data) =>
  axios.post(
    `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/product/create`,
    data,
    {
      withCredentials: true,
    }
  );

export const getProducts = () =>
  axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/product/`, {
    withCredentials: true,
  });

export const updateProduct = (data) =>
  axios.patch(
    `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/product/update`,
    data,
    {
      withCredentials: true,
    }
  );

export const deleteProduct = (id) =>
  axios.delete(
    `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${id}`,
    {
      withCredentials: true,
    }
  );
