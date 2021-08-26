import axios from 'axios';

export const getCategories = () =>
  axios.get(`https://${process.env.REACT_APP_BACKEND_URL}/api/v1/category`);
