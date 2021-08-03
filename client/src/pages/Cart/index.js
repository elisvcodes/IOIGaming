import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/index';
import { Grid, Container, Card, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CartItem from './CartItem';
export default function Cart() {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const [cartItems, setCartItems] = useState();
  useEffect(async () => {
    const cartItemIds = cart.items.map((cart) => cart.item);
    const { data } = await axios.post(
      `http://localhost:7000/api/v1/cart/items`,
      { cartItemIds }
    );
    setCartItems(data);
    console.log(data);
  }, []);
  return (
    <>
      <Layout>
        <Container>
          <Grid container>
            <Grid item sm={12} md={8}>
              {cartItems && cartItems.length > 0 ? (
                cartItems.map((item) => {
                  return (
                    <>
                      <CartItem item={item} key={item._id} />
                    </>
                  );
                })
              ) : (
                <Card
                  style={{
                    height: '100px',
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '95%',
                  }}
                >
                  <Typography variant='h4'>
                    Your Shopping Cart is Empty
                  </Typography>
                </Card>
              )}
            </Grid>
            <Grid item sm={12} md={4}>
              <Card
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  padding: '10px 0',
                }}
              >
                <Typography variant='body1'>Order Summary</Typography>
                <Typography variant='body1'>Order Summary</Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
}
