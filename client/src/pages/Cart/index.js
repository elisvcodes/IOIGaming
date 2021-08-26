import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/index';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Container,
  Card,
  Typography,
  Button,
  Link,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CartItem from './CartItem';
export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState();
  const [cartTotal, setCartTotal] = useState(0);
  const history = useHistory();
  useEffect(async () => {
    const cartItemIds = cart.items.map((cart) => cart.item);
    const { data } = await axios.post(
      `https://${process.env.REACT_APP_BACKEND_URL}/api/v1/cart/items`,
      { cartItemIds }
    );
    setCartItems(data);
    setCartTotal(cart.items.reduce((acc, cur) => acc + cur.total, 0));
  }, []);

  return (
    <>
      <Layout>
        <Container>
          <Grid container>
            <Grid item xs={12} md={8}>
              {cartItems && cartItems.length > 0 ? (
                cartItems.map((item, idx) => {
                  return (
                    <>
                      <CartItem
                        item={item}
                        key={idx}
                        setCartTotal={setCartTotal}
                      />
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
            <Grid item xs={12} md={4}>
              <Card
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '10px',
                  height: '230px',
                  width: '100%',
                }}
              >
                <Typography variant='h6' align='center'>
                  Order Summary
                </Typography>
                <div style={{ margin: '10px 0' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      margin: '5px 0',
                    }}
                  >
                    <Typography variant='body2'>Subtotal </Typography>
                    <Typography variant='body2'>
                      ${cartTotal.toFixed(2)}{' '}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      margin: '5px 0',
                    }}
                  >
                    <Typography variant='body2'>Shipping & Handling</Typography>
                    <Typography variant='body2'>FREE </Typography>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      margin: '5px 0',
                    }}
                  >
                    <Typography variant='body2'>Estimated Tax </Typography>
                    <Typography variant='body2'>$0 </Typography>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      margin: '5px 0',
                    }}
                  >
                    <Typography variant='body2'>Estimated Total </Typography>
                    <Typography variant='body2'>
                      ${cartTotal.toFixed(2)}{' '}
                    </Typography>
                  </div>
                </div>
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  onClick={() =>
                    history.push({
                      pathname: '/checkout',
                      state: { cart, cartTotal },
                    })
                  }
                >
                  Checkout
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
}
