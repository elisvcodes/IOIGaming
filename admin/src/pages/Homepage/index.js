import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/index';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import config from '../../util/config';
import { getOrders } from '../../_actions/order';
import { useDispatch } from 'react-redux';
export default function Homepage() {
  const dispatch = useDispatch();
  const [weeklyChart, setWeeklyChart] = useState({ data: [], fetching: false });

  const ordersReducer = useSelector((state) => state.ordersReducer);
  const { orders } = ordersReducer;

  const { data } = weeklyChart;

  const rev = orders.reduce((acc, curr) => {
    return acc + curr.orderTotal;
  }, 0);

  useEffect(() => {
    (async function fetchData() {
      setWeeklyChart({ fetching: true });
      const { data } = await axios.get(
        `${config.SERVER_URI}/api/v1/orders/weeklygraph`,
        {
          withCredentials: true,
        }
      );
      setWeeklyChart({ data: data, fetching: false });
    })();
    dispatch(getOrders());
  }, []);

  const { fetching } = (ordersReducer, weeklyChart);

  if (fetching) {
    return 'loading';
  }

  const chartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Orders',
        data: data.map(({ orders }) => orders),
        fill: false,
        backgroundColor: '#023047',
        borderColor: '#023047',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      <Layout sidebar>
        <h3>Sales Summary</h3>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '99%',
            marginTop: '20px',
            gap: '10px',
          }}
        >
          <div
            style={{
              backgroundColor: '#023047',
              color: 'white',
              flex: '1',
              textAlign: 'center',
              padding: '20px ',
            }}
          >
            <Typography variant='body1'>Total Orders</Typography>
            <Typography variant='body1' style={{ marginTop: '15px' }}>
              {orders.length > 0 ? orders.length : 0}
            </Typography>
          </div>
          <div
            style={{
              backgroundColor: '#023047',
              color: 'white',
              textAlign: 'center',
              padding: '20px ',
              flex: '1',
            }}
          >
            <Typography variant='body1'>Total Revenue</Typography>
            <Typography variant='body1' style={{ marginTop: '15px' }}>
              {rev !== undefined ? `$${rev.toFixed(2)}` : 0}
            </Typography>
          </div>
          <div
            style={{
              backgroundColor: '#023047',
              color: 'white',
              flex: '1',
              textAlign: 'center',
              padding: '20px ',
            }}
          >
            <Typography variant='body1'>Total Profit</Typography>
            <Typography variant='body1' style={{ marginTop: '15px' }}>
              {rev !== undefined ? `$${(rev - rev * 0.03).toFixed(2)}` : 0}
            </Typography>
          </div>
          <div
            style={{
              backgroundColor: '#023047',
              color: 'white',
              flex: '1',
              textAlign: 'center',
              padding: '20px ',
            }}
          >
            <Typography variant='body1'>Order Average</Typography>
            <Typography variant='body1' style={{ marginTop: '15px' }}>
              {rev !== undefined ? (rev / orders.length).toFixed(2) : 0}
            </Typography>
          </div>
        </div>
        <div style={{ width: '99%', margin: '20px 0' }}>
          <Line data={chartData} options={options} />
        </div>
      </Layout>
    </>
  );
}
