import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { getProductsByCat } from '../../_actions/products';
import { useDispatch, useSelector } from 'react-redux';
import Products from '../../components/Products';
export default function Categories(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsByCat(props.match.params.slug));
  }, [dispatch]);

  const productsState = useSelector((state) => state.productReducer);
  const { products, isFetching } = productsState;

  if (isFetching) {
    return 'loading';
  }
  return (
    <>
      <Layout sidebar={{ props: products }}>
        <div style={{ marginTop: '20px' }}>
          <Products products={products} />
        </div>
      </Layout>
    </>
  );
}
