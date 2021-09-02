const initState = { orders: [], fetching: false };
export const ordersReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ORDERS_REQUEST':
      return { ...state, fetching: true };
    case 'GET_ORDERS':
      return { ...state, orders: action.payload, fetching: false };
    default:
      return state;
  }
};
