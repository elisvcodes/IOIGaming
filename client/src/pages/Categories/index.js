import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { getProductsByCat } from '../../_actions/products';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Link } from '@material-ui/core';
import Products from '../../components/Products';
export default function Categories(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsByCat(props.match.params.slug));
  }, []);
  const products = useSelector((state) => state.products);
  return (
    <>
      <Layout sidebar={{ props: products && products }}>
        <div style={{ marginTop: '20px' }}>
          <Products products={products} />
        </div>
      </Layout>
    </>
  );
}
