export default (pages = [], action) => {
  switch (action.type) {
    case 'GET_PAGES':
      return action.payload;

    default:
      return pages;
  }
};
