import axios from 'axios';
import config from '../util/config';
console.log(config);
export const createPage = (data) =>
  axios.post(`${config.SERVER_URI}/api/v1/page/create`, data, {
    withCredentials: true,
  });

export const getPages = () =>
  axios.get(`${config.SERVER_URI}/api/v1/page`, {
    withCredentials: true,
  });

export const updatePage = (data) =>
  axios.patch(`${config.SERVER_URI}/api/v1/page/update`, data, {
    withCredentials: true,
  });

export const deletePage = (id) =>
  axios.delete(`${config.SERVER_URI}/api/v1/page/${id}`, {
    withCredentials: true,
  });
