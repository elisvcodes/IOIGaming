import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton } from '@material-ui/core';
import { IoAddSharp, IoRemoveSharp } from 'react-icons/io5';
import { incrementItem, decrementItem } from '../../../_actions/cart';
import { useDispatch, useSelector } from 'react-redux';
export default function CartItem({ item }) {
  const cart = useSelector((state) => state.cart);
  const cartItem = cart.items.find((cartItem) => cartItem.item === item._id)
    ? cart.items.find((cartItem) => cartItem.item === item._id)
    : 0;
  const [quantity, setQuantity] = useState(
    cartItem.quantity ? cartItem.quantity : cartItem
  );
  const dispatch = useDispatch();

  return quantity < 1 ? (
    ''
  ) : (
    <Card
      style={{
        margin: '20px 0 ',
        display: 'flex',
        alignItems: 'center',
        width: '95%',
      }}
    >
      <img
        src={`http://localhost:7000/public/media/products/${item.productImg[0].img}`}
        alt=''
        style={{
          width: '100px',
          height: '100px',
          objectFit: 'contain',
          margin: '0 15px',
        }}
      />
      <CardContent>
        <Typography variant='body1'>{item.name}</Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          Condition: New
        </Typography>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '70px',
            justifyContent: 'space-between',
            marginTop: '15px',
          }}
        >
          <IconButton
            onClick={() => {
              return (
                setQuantity(quantity + 1),
                dispatch(incrementItem(item._id, quantity + 1))
              );
            }}
          >
            <IoAddSharp fontSize='20px' />
          </IconButton>
          {quantity}
          <IconButton
            onClick={() => {
              return (
                setQuantity(quantity - 1),
                dispatch(decrementItem(item._id, quantity - 1))
              );
            }}
          >
            <IoRemoveSharp fontSize='20px' />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
}
