import axios from 'axios';
import config from '../util/config';

export const createProduct = (data) =>
  axios.post(`${config.SERVER_URI}/api/v1/product/create`, data, {
    withCredentials: true,
  });

export const getProducts = () =>
  axios.get(`${config.SERVER_URI}/api/v1/product/`, { withCredentials: true });

export const updateProduct = (data) =>
  axios.patch(`${config.SERVER_URI}/api/v1/product/update`, data, {
    withCredentials: true,
  });

export const deleteProduct = (id) =>
  axios.delete(`${config.SERVER_URI}/api/v1/product/${id}`, {
    withCredentials: true,
  });
