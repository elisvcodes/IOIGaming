export default (auth = { user: {}, isLoggedIn: false }, action) => {
  switch (action.type) {
    case 'AUTH':
      return {
        ...auth,
        user: action.payload,
        isLoggedIn: true,
      };
    case 'isLoggedIn':
      return {
        ...auth,
        isLoggedIn: action.payload,
      };
    default:
      return auth;
  }
};
