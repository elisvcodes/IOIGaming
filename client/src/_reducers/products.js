export default (products = [], action) => {
  switch (action.type) {
    case 'GET_RPODUCTS_BY_CAT':
      return action.payload;

    default:
      return products;
  }
};
