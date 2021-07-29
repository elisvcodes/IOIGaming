import axios from 'axios';

export const getCategories = () =>
  axios.get('http://localhost:7000/api/v1/category');
