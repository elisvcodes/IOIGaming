import React, { useEffect } from 'react';
import Layout from '../../components/Layout/index';
import { getProducts } from '../../_actions/products';
import { useDispatch, useSelector } from 'react-redux';
import Products from '../../components/Products';

export default function Categories(props) {
  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(
      getProducts({
        slug: props.match.params.slug,
        priceQuery: props.location.search,
      })
    );
  }, [dispatch, props.location]);
  const productsState = useSelector((state) => state.productReducer);
  const { products, isFetching } = productsState;
  if (isFetching) {
    return 'loading';
  }
  return (
    <>
      <Layout sidebar={{ products: products, props }}>
        <div style={{ marginTop: '20px' }}>
          <Products products={products} />
        </div>
      </Layout>
    </>
  );
}
