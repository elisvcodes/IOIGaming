import axios from 'axios';
import config from '../util/config';

export const createCategory = (data) =>
  axios.post(`${config.SERVER_URI}/api/v1/category/create`, data, {
    withCredentials: true,
  });

export const getCategories = () =>
  axios.get(`${config.SERVER_URI}/api/v1/category`, { withCredentials: true });

export const updateCategory = (data) =>
  axios.patch(`${config.SERVER_URI}/api/v1/category/update`, data, {
    withCredentials: true,
  });

export const deleteCategory = (id) =>
  axios.delete(`${config.SERVER_URI}/api/v1/category/${id}`, {
    withCredentials: true,
  });
