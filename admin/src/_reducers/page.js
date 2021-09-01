const initState = { pages: [], fetching: false };
export const pagesReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_PAGES_REQUEST':
      return { ...state, fetching: true };
    case 'GET_PAGES':
      return { ...state, pages: action.payload, fetching: false };

    default:
      return state;
  }
};
