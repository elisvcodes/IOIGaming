const initState = { page: {}, isFetching: false };
export const pageReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_PAGE_REQUEST':
      return { ...state, isFetching: true };
    case 'GET_PAGE':
      return { ...state, page: action.payload, isFetching: false };
    default:
      return state;
  }
};
