const initState = { user: {}, isLoggedIn: false, fetching: false };
export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'BEGIN_AUTH':
      return {
        ...state,
        fetching: true,
      };
    case 'AUTH':
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        fetching: false,
      };
    case 'isLoggedIn':
      return {
        ...state,
        isLoggedIn: action.payload,
        fetching: false,
      };
    default:
      return state;
  }
};
