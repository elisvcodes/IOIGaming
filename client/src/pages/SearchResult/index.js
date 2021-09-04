import { Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/index';
import Products from '../../components/Products/index';
import { getProducts } from '../../_actions/products';
import { useDispatch, useSelector } from 'react-redux';

export default function SearchResult(props) {
  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(getProducts({ query: props.location.search }));
  }, [dispatch, props.location]);
  const productsState = useSelector((state) => state.productReducer);
  const { products, isFetching } = productsState;
  if (isFetching) {
    return 'loading';
  }

  return (
    <>
      <Layout sidebar={{ products: products, props }}>
        <Container>
          <div style={{ marginTop: '20px' }}>
            <Products products={products} />
          </div>
        </Container>
      </Layout>
    </>
  );
}
