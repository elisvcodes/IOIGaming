import axios from 'axios';

export const createProduct = (data) =>
  axios.post('http://localhost:7000/api/v1/product/create', data, {
    withCredentials: true,
  });

export const getProducts = () =>
  axios.get('http://localhost:7000/api/v1/product/', { withCredentials: true });
