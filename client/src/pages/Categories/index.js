import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { getProducts } from '../../_actions/products';
import { useDispatch, useSelector } from 'react-redux';
import Products from '../../components/Products';
import axios from 'axios';
import config from '../../util/config';

export default function Categories(props) {
  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(
      getProducts({
        slug: props.match.params.slug,
        priceQuery: props.location.search,
      })
    );
    // const { data } = await axios.get(
    //   `${config.SERVER_URI}/api/v1/product/products/${props.match.params.slug}`
    // );
    // console.log(data);
    // setProductData(data);
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
