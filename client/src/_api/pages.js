import axios from 'axios';

export const getPage = (slug) =>
  axios.get(`http://localhost:7000/api/v1/page/${slug}`);
