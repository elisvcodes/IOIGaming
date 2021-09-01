let cartStorage = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { owner: null, items: [] };
export default (cart = cartStorage, action) => {
  switch (action.type) {
    case 'GET_CART':
      return cart;
    case 'ADD_TO_CART':
      if (cart.items.length > 0) {
        const itemInCart = cart.items.find(
          (cartItems) => cartItems.item === action.payload.item
        );

        if (!itemInCart) {
          cart.items.push(action.payload);
          localStorage.setItem('cart', JSON.stringify(cart));
        }
      } else {
        cart.items.push(action.payload);
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      return { ...cart };

    case 'INCREMENT':
      cart.items = cart.items.map((item) =>
        item.item === action.payload.item ? action.payload : item
      );
      localStorage.setItem('cart', JSON.stringify(cart));

      return { ...cart };

    case 'DECREMENT':
      if (action.payload.quantity < 1) {
        cart.items = cart.items.filter(
          (item) => item.item !== action.payload.item
        );
      } else {
        cart.items = cart.items.map((item) =>
          item.item === action.payload.item ? action.payload : item
        );
      }
      localStorage.setItem('cart', JSON.stringify(cart));

      return { ...cart };

    default:
      return cart;
  }
};
