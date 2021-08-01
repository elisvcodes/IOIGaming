let cartStorage = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [];
export default (cart = cartStorage, action) => {
  switch (action.type) {
    case 'GET_CART':
      return cart;
    case 'ADD_TO_CART':
      if (cart.length > 0) {
        console.log(action.payload.items);
        const itemInCart = cart.find((cartItems) =>
          cartItems.items.find(
            (items) => items.item === action.payload.items[0].item
          )
        );
        if (!itemInCart) {
          cart.push(action.payload);
          localStorage.setItem('cart', JSON.stringify(cart));
        }
      } else {
        cart.push(action.payload);
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      return [...cart];

    default:
      return cart;
  }
};
