import axios from 'axios';

export const createPage = (data) =>
  axios.post(
    `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/page/create`,
    data,
    {
      withCredentials: true,
    }
  );

export const getPages = () =>
  axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/page`, {
    withCredentials: true,
  });

export const updatePage = (data) =>
  axios.patch(
    `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/page/update`,
    data,
    {
      withCredentials: true,
    }
  );

export const deletePage = (id) =>
  axios.delete(
    `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/page/${id}`,
    {
      withCredentials: true,
    }
  );
