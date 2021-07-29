export default (page = {}, action) => {
  switch (action.type) {
    case 'GET_PAGE':
      return action.payload;

    default:
      return page;
  }
};
