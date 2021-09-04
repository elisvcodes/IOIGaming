import React, { useEffect } from 'react';
import Layout from '../../components/Layout/index';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Link, useHistory } from 'react-router-dom';
import { getOrders } from '../../_actions/order';

import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const useStyles = makeStyles({
  actions: {
    '& a': {
      margin: '0 10px',
    },
  },
});

export default function Orders() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const ordersReducer = useSelector((state) => state.ordersReducer);
  const { orders, fetching } = ordersReducer;
  if (fetching) {
    return 'loading';
  }
  const rows = (orders) => {
    return orders.map((order) => {
      return {
        id: order.orderNumber,
        orderNumber: order.orderNumber,
        name: `${order.firstName} ${order.lastName}`,
        date: dayjs(order.createdAt).format('MM/DD/YYYY'),
        shipped: order.hasShipped ? 'Yes' : 'No',
        total: `$${order.orderTotal}`,
        actions: 'actions',
      };
    });
  };

  const columns = [
    {
      field: 'orderNumber',
      headerName: 'ORDER #',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'NAME',
      flex: 1,
    },
    {
      field: 'date',
      headerName: 'PURCHASED ON',
      flex: 1,
    },
    {
      field: 'shipped',
      headerName: 'HAS SHIPPED',
      flex: 1,
    },
    {
      field: 'total',
      headerName: 'TOTAL',
      width: 250,
    },

    {
      field: 'actions',
      headerName: 'ACTIONS',
      width: 150,
      renderCell: (params) => {
        return (
          <div className={classes.actions}>
            <a
              href='#'
              onClick={(e) => {
                e.preventDefault();
                return history.push({
                  pathname: `/orders/${params.id}`,
                  state: orders.find(
                    (order) => order.orderNumber === params.id
                  ),
                });
              }}
            >
              View
            </a>
          </div>
        );
      },
    },
  ];
  console.log(orders);
  return (
    <>
      <Layout sidebar>
        <h3>Orders</h3>
        <div>
          <DataGrid
            autoHeight
            rows={rows(orders)}
            columns={columns}
            pagination
            pageSize={10}
          />
        </div>
      </Layout>
    </>
  );
}
