import React, { useState } from 'react';

import { makeStyles, Avatar } from '@material-ui/core';
import Layout from '../../components/Layout/index';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../../_actions/product';
import { DataGrid } from '@material-ui/data-grid';
import { GrDocumentImage } from 'react-icons/gr';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import currency from 'currency.js';
import { Link, useHistory } from 'react-router-dom';
dayjs.extend(relativeTime);

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 700,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  actions: {
    '& a': {
      margin: '0 10px',
    },
  },
}));

export default function Products() {
  const classes = useStyles();

  const categoriesReducer = useSelector((state) => state.categoriesReducer);
  const { categories } = categoriesReducer;

  const productsReducer = useSelector((state) => state.productsReducer);
  const { products } = productsReducer;

  const { fetching } = (categoriesReducer, productsReducer);

  const dispatch = useDispatch();
  const history = useHistory();

  const rows = (products) => {
    return products.map((product) => {
      console.log(product);
      return {
        id: product._id,
        image:
          product.productImg.length > 0
            ? `${product.productImg[0].imageUrl}`
            : '',
        // image: `${product.productImg[0].img}`,
        // product.productImg.length > 0 ?  `${product.productImg[0].imageUrl}` : ''  ,
        name: product.name,
        slug: product.slug,
        shortDescription: product.shortDescription,
        longDescription: product.longDescription,
        price: currency(product.price).format(),
        quantity: product.quantity,
        // categoryId: product.categoryId,
        sku: product.sku,
        isFeatured: product.isFeatured,
        date: dayjs(product.updatedAt).format('MM/DD/YY'),
        actions: 'actions',
      };
    });
  };

  const columns = [
    {
      field: 'image',
      headerName: 'IMAGE',
      width: 125,
      renderCell: (params) => {
        return params.value === 'undefined' ? (
          <GrDocumentImage size={30} style={{ marginRight: 'auto' }} />
        ) : (
          <Avatar
            src={` ${params.value}`}
            variant='square'
            style={{ height: '50px', width: '50px', marginRight: 'auto' }}
          />
        );
      },
    },
    {
      field: 'name',
      headerName: 'NAME',
      width: 150,
    },
    {
      field: 'shortDescription',
      headerName: 'SHORT DESCRIPTION',
      width: 250,
    },
    {
      field: 'price',
      headerName: 'PRICE',
      width: 125,
    },
    {
      field: 'sku',
      headerName: 'SKU',
      width: 125,
    },
    {
      field: 'quantity',
      headerName: 'QUANTITY',
      width: 150,
    },
    {
      field: 'date',
      headerName: 'DATE',
      width: 150,
    },

    {
      field: 'actions',
      headerName: 'ACTIONS',
      width: 150,
      renderCell: (params) => {
        return (
          <div className={classes.actions}>
            <a
              href={`products/edit/${params.id}`}
              onClick={(e) => {
                e.preventDefault();
                return history.push({
                  pathname: `/products/edit/${params.id}`,
                  state: products.find((product) => product._id === params.id),
                });
              }}
            >
              Edit
            </a>
            <a
              href='#'
              onClick={(e) => {
                e.preventDefault();
                dispatch(deleteProduct(params.id));
              }}
            >
              Delete
            </a>
          </div>
        );
      },
    },
  ];

  if (fetching) {
    return 'loading';
  }

  return (
    <>
      <Layout sidebar>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>Products</h3>
          <Link to='/products/add'>
            <button
              style={{
                padding: '1px 20px',
                margin: '15px',
                cursor: 'pointer',
              }}
            >
              Add
            </button>
          </Link>
        </div>
        <div>
          <DataGrid
            autoHeight
            rows={rows(products)}
            columns={columns}
            pagination
            pageSize={7}
          />
        </div>
      </Layout>
    </>
  );
}
