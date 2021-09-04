import React from 'react';
import Layout from '../../../components/Layout/index';
import { Paper, Typography } from '@material-ui/core';
import { useLocation } from 'react-router';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export default function OrderActions(props) {
  const location = useLocation();

  return (
    <Layout sidebar>
      <div style={{ marginTop: '20px', width: '80%' }}>
        <Typography variant='h6'>
          Order# {`${location.state.orderNumber}`} deatils
        </Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
          }}
        >
          <div>
            <Typography> General</Typography>
            <div style={{ marginTop: '20px' }}>
              <Typography variant='body2'>Purchase Date:</Typography>
              <Typography variant='body2'>
                {`${dayjs(location.state.createdAt).format('MM/DD/YYYY')} `}
              </Typography>
              <div style={{ marginTop: '20px' }}>
                <Typography variant='body1'>Total Amount:</Typography>
                <Typography variant='body2'>
                  {`${location.state.orderTotal}`}
                </Typography>
              </div>
              <div style={{ marginTop: '20px' }}>
                <Typography variant='body1'>Item Shipped?:</Typography>
                <Typography variant='body2'>
                  {`${location.state.hasShipped ? 'Yes' : 'No'}`}
                </Typography>
              </div>
            </div>
          </div>
          <div>
            <Typography> Billing</Typography>
            <div style={{ marginTop: '20px' }}>
              <Typography variant='body2'>
                {`${location.state.firstName} ${location.state.lastName}`}
              </Typography>
              <Typography variant='body2'>
                {`${location.state.address} ${location.state.apt}`}
              </Typography>
              <Typography variant='body2'>
                {`${location.state.city} ${location.state.state},  ${location.state.zip}`}
              </Typography>
              <div style={{ marginTop: '20px' }}>
                <Typography variant='body1'>Email Address:</Typography>
                <Typography variant='body2'>
                  {`${location.state.email}`}
                </Typography>
              </div>
              <div style={{ marginTop: '20px' }}>
                <Typography variant='body1'>Phone Number:</Typography>
                <Typography variant='body2'>
                  {`${location.state.phone ? location.state.phone : 'N/A'}`}
                </Typography>
              </div>
            </div>
          </div>
          <div>
            <Typography> Shipping</Typography>
            <div style={{ marginTop: '20px' }}>
              <Typography variant='body2'>
                {`${location.state.firstName} ${location.state.lastName}`}
              </Typography>
              <Typography variant='body2'>
                {`${location.state.address} ${location.state.apt}`}
              </Typography>
              <Typography variant='body2'>
                {`${location.state.city} ${location.state.state},  ${location.state.zip}`}
              </Typography>
              <div style={{ marginTop: '20px' }}>
                <Typography variant='body1'>Email Address:</Typography>
                <Typography variant='body2'>
                  {`${location.state.email}`}
                </Typography>
              </div>
              <div style={{ marginTop: '20px' }}>
                <Typography variant='body1'>Phone Number:</Typography>
                <Typography variant='body2'>
                  {`${location.state.phone ? location.state.phone : 'N/A'}`}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '60px' }}>
          <Typography variant='body1'>Items Ordered</Typography>
          <div
            style={{
              marginTop: '20px',
            }}
          >
            <table
              style={{
                width: '100%',
              }}
            >
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Cost</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {location.state.itemsOrdered.map((order) => (
                  <>
                    <tr>
                      <td
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <img
                          src={`${order.item.productImg[0].imageUrl}`}
                          alt={`${order.item.productImg[0].imageName}`}
                          style={{ width: '100px' }}
                        />
                        <Typography variant='body2'>
                          {order.item.name}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant='body2'>
                          {`$${order.item.price}`}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant='body2'>
                          {`${order.quantity}`}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant='body2'>
                          {`$${order.quantity * order.item.price}`}
                        </Typography>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
