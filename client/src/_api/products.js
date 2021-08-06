import axios from 'axios';

export const getProductsByCat = (slug) =>
  axios.get(
    `http://localhost:7000/api/v1/category/${slug}${window.location.search}`
  );
