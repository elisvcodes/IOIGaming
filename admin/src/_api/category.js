import axios from 'axios';

export const createCategory = (data) =>
  axios.post('http://localhost:7000/api/v1/category/create', data, {
    withCredentials: true,
  });

export const getCategories = () =>
  axios.get('http://localhost:7000/api/v1/category', { withCredentials: true });

export const updateCategory = (data) =>
  axios.patch('http://localhost:7000/api/v1/category/update', data, {
    withCredentials: true,
  });

export const deleteCategory = (id) =>
  axios.delete(`http://localhost:7000/api/v1/category/${id}`, {
    withCredentials: true,
  });
