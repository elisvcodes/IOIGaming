import React from 'react';
import Layout from '../../components/Layout/index';
import { Container } from '@material-ui/core';
import { AiOutlineShopping } from 'react-icons/ai';
export default function OrderConfirmation(props) {
  return (
    <>
      <Layout>
        <Container maxWidth='sm'>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '50vh',
            }}
          >
            <AiOutlineShopping size={40} />
            <h1>Thank You</h1>
            <p
              style={{
                textAlign: 'center',
                fontSize: '17px',
                lineHeight: '30px',
              }}
            >
              We have received your order and we will ship it ASAP. Meanwhile,
              here is your confirmation number:{' '}
              <strong>#{`${props.location.state}`}</strong>
            </p>
          </div>
        </Container>
      </Layout>
    </>
  );
}
