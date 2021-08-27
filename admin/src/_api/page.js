import axios from 'axios';

export const createPage = (data) =>
  axios.post('http://localhost:7000/api/v1/page/create', data, {
    withCredentials: true,
  });

export const getPages = () =>
  axios.get('http://localhost:7000/api/v1/page', {
    withCredentials: true,
  });

export const updatePage = (data) =>
  axios.patch('http://localhost:7000/api/v1/page/update', data, {
    withCredentials: true,
  });

export const deletePage = (id) =>
  axios.delete(`http://localhost:7000/api/v1/page/${id}`, {
    withCredentials: true,
  });
