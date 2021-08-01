export default (catgeories = [], action) => {
  switch (action.type) {
    case 'GET_CATEGORIES':
      return action.payload;
    case 'GET_RPODUCTS_BY_CAT':
      return action.payload;

    default:
      return catgeories;
  }
};
