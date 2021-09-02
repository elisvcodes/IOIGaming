import React from 'react';
import Layout from '../../components/Layout/index';
import { useSelector } from 'react-redux';
export default function Orders() {
  const ordersReducer = useSelector((state) => state.ordersReducer);
  const { orders, fetching } = ordersReducer;
  if (fetching) {
    return 'loading';
  }
  console.log(orders);
  return (
    <>
      <Layout sidebar>
        <h3>Orders</h3>
      </Layout>
    </>
  );
}
