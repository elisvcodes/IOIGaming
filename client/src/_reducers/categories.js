export default (catgeories = [], action) => {
  switch (action.type) {
    case 'GET_CATEGORIES':
      return action.payload;

    default:
      return catgeories;
  }
};
