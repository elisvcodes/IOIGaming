import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/index';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import {
  Container,
  Grid,
  TextField,
  Card,
  Button,
  Typography,
} from '@material-ui/core';
import './style.css';
import config from '../../util/config';
import { useHistory } from 'react-router-dom';

export default function Checkout(props) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [orderConfimration, setOrderConfirmation] = useState('');
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apt: '',
    zip: '',
    city: '',
    state: '',
    email: '',
    phoneNumber: '',
  });

  const [itemsInCart] = useState(props.location.state.cart.items);
  const customerInfoOnChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const cardOnChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  useEffect(async () => {
    const { data } = await axios.post(
      `${config.SERVER_URI}/api/v1/payments/payment`,
      { total: props.location.state.cartTotal }
    );
    setClientSecret(data.clientSecret);
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '18px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const createOrder = async () => {
    const { data } = await axios.post(
      `${config.SERVER_URI}/api/v1/orders/create`,
      {
        customerInfo,
        itemsOrdered: itemsInCart,
        orderTotal: props.location.state.cartTotal,
      },
      { withCredentials: true }
    );
    history.push({
      pathname: '/order-confirmation',
      state: data,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          email: customerInfo.email,
          address: {
            city: customerInfo.city,
            state: customerInfo.state,
            line1: customerInfo.address,
            line2: customerInfo.apt,
            postal_code: customerInfo.zip,
          },
        },
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      createOrder();
    }
  };

  return (
    <>
      <Layout>
        <Container>
          <h3>Checkout</h3>
          <Grid container className='checkout'>
            <Grid item xs={12} md={8}>
              <form action='' className='form' onSubmit={onSubmit}>
                <div className='formItems'>
                  <TextField
                    type='text'
                    name='firstName'
                    label='First Name'
                    variant='outlined'
                    className='formItem'
                    value={customerInfo.firstName}
                    onChange={customerInfoOnChange}
                  />
                  <TextField
                    type='text'
                    name='lastName'
                    label='Last Name'
                    variant='outlined'
                    className='formItem'
                    value={customerInfo.lastName}
                    onChange={customerInfoOnChange}
                  />
                </div>
                <div className='formItems'>
                  <TextField
                    type='text'
                    name='address'
                    label='Address'
                    variant='outlined'
                    className='formItem'
                    value={customerInfo.address}
                    onChange={customerInfoOnChange}
                  />
                  <TextField
                    type='text'
                    name='apt'
                    label='Apt, Suite, Floor (optional)'
                    variant='outlined'
                    className='formItem'
                    value={customerInfo.apt}
                    onChange={customerInfoOnChange}
                  />
                </div>
                <div className='formItems'>
                  <TextField
                    type='number'
                    name='zip'
                    label='Zip'
                    variant='outlined'
                    className='formItem'
                    value={customerInfo.zip}
                    onChange={customerInfoOnChange}
                  />
                  <TextField
                    type='text'
                    label='City'
                    name='city'
                    variant='outlined'
                    className='formItem'
                    value={customerInfo.city}
                    onChange={customerInfoOnChange}
                  />
                  <TextField
                    type='text'
                    label='State'
                    name='state'
                    variant='outlined'
                    className='formItem'
                    value={customerInfo.state}
                    onChange={customerInfoOnChange}
                  />
                </div>
                <div className='formItems'>
                  <TextField
                    type='email'
                    label='Email'
                    name='email'
                    variant='outlined'
                    className='formItem'
                    value={customerInfo.email}
                    onChange={customerInfoOnChange}
                  />
                  <TextField
                    type='number'
                    label='Phone Number'
                    name='phoneNumber'
                    variant='outlined'
                    className='formItem'
                    value={customerInfo.phoneNumber}
                    onChange={customerInfoOnChange}
                  />
                </div>
                <h3>Payment</h3>
                <div id='payment-form'></div>
                <CardElement
                  id='payment-form'
                  options={cardStyle}
                  onChange={cardOnChange}
                />
                <Button
                  variant='contained'
                  color='primary'
                  size='small'
                  type='submit'
                  style={{ marginTop: '20px', width: '10%' }}
                  disabled={processing || disabled || succeeded}
                >
                  {processing ? (
                    <div className='spinner' id='spinner'></div>
                  ) : (
                    'Pay'
                  )}
                </Button>
                {error && (
                  <div className='card-error' role='alert'>
                    {error}
                  </div>
                )}
              </form>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                style={{
                  marginTop: '5px',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '10px',
                  height: '175px',
                  marginBottom: '10px',
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
                      $
                      {props.location.state &&
                        props.location.state.cartTotal.toFixed(2)}{' '}
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
                      $
                      {props.location.state &&
                        props.location.state.cartTotal.toFixed(2)}{' '}
                    </Typography>
                  </div>
                </div>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
}
