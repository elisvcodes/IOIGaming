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
export default function Checkout(props) {
  const [succeeded, setSucceeded] = useState(false);

  const [error, setError] = useState(null);

  const [processing, setProcessing] = useState('');

  const [disabled, setDisabled] = useState(true);

  const [clientSecret, setClientSecret] = useState('');

  const stripe = useStripe();

  const elements = useElements();

  useEffect(() => {
    const { clientSecret } = axios.post(
      'http://localhost:7000/api/v1/payments/payment',
      { total: props.location.state.cartTotal }
    );
    setClientSecret(clientSecret);
  });
  return (
    <>
      <Layout>
        <Container>
          <h3>Checkout</h3>
          <Grid container className='checkout'>
            <Grid item xs={12} md={8}>
              <form action='' className='form'>
                <div className='formItems'>
                  <TextField
                    type='text'
                    label='First Name'
                    variant='outlined'
                    className='formItem'
                  />
                  <TextField
                    type='text'
                    label='Last Name'
                    variant='outlined'
                    className='formItem'
                  />
                </div>
                <div className='formItems'>
                  <TextField
                    type='text'
                    label='Address'
                    variant='outlined'
                    className='formItem'
                  />
                  <TextField
                    type='text'
                    label='Apt, Suite, Floor (optional)'
                    variant='outlined'
                    className='formItem'
                  />
                </div>
                <div className='formItems'>
                  <TextField
                    type='text'
                    label='Zip'
                    variant='outlined'
                    className='formItem'
                  />
                  <TextField
                    type='text'
                    label='City'
                    variant='outlined'
                    className='formItem'
                  />
                  <TextField
                    type='text'
                    label='State'
                    variant='outlined'
                    className='formItem'
                  />
                </div>
                <div className='formItems'>
                  <TextField
                    type='text'
                    label='Email'
                    variant='outlined'
                    className='formItem'
                  />
                  <TextField
                    type='text'
                    label='Phone Number'
                    variant='outlined'
                    className='formItem'
                  />
                </div>
                <h3>Payment</h3>
                <div id='payment-form'></div>
                <CardElement id='payment-form' />
                <Button
                  variant='contained'
                  color='primary'
                  size='small'
                  style={{ marginTop: '20px', width: '10%' }}
                >
                  Pay
                </Button>
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
