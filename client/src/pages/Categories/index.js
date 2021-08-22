import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { getProductsByCat } from '../../_actions/products';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Link } from '@material-ui/core';
import './style.css';
export default function Categories(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsByCat(props.match.params.slug));
  }, []);
  const products = useSelector((state) => state.products);
  return (
    <>
      <Layout sidebar={{ props: products && products }}>
        <Grid container>
          {products.length > 0 ? (
            products.map((product) => {
              return (
                <Grid item xs={12} sm={4} key={product._id}>
                  <div className='productsCard'>
                    <Link
                      href={`/products/${product.slug}`}
                      underline='none'
                      color='textPrimary'
                    >
                      <img
                        src={`${product.productImg[0].imageUrl}`}
                        alt={product.name}
                      />
                      <p className='productTitle'>{product.name}</p>
                      <p className='productPrice'>${product.price}</p>
                    </Link>
                  </div>
                </Grid>
              );
            })
          ) : (
            <p>No products</p>
          )}
        </Grid>
      </Layout>
    </>
  );
}
