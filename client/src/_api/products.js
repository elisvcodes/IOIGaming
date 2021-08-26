import axios from 'axios';

export const getProductsByCat = (slug) =>
  axios.get(
    `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/category/${slug}${window.location.search}`
  );
