import axios from 'axios';

export const getPage = (slug) =>
  axios.get(`https://${process.env.REACT_APP_BACKEND_URL}/api/v1/page/${slug}`);
