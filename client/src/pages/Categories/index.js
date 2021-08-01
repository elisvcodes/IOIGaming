import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { getProductsByCat } from '../../_actions/products';
import { useDispatch, useSelector } from 'react-redux';
import {
  CardContent,
  CardMedia,
  Card,
  Grid,
  Typography,
  CardActionArea,
  CardActions,
  Button,
  Link,
} from '@material-ui/core';
import './style.css';
export default function Categories(props) {
  console.log(props.match.params.slug);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsByCat(props.match.params.slug));
  }, []);
  const products = useSelector((state) => state.products);
  console.log(products);
  return (
    <>
      <Layout sidebar>
        <Grid container>
          {products.length > 0 ? (
            products.map((product) => {
              return (
                <Grid item xs={6} sm={4} key={product._id}>
                  <div className='productsCard'>
                    <Link
                      href={`/products/${product.slug}`}
                      underline='none'
                      color='textPrimary'
                    >
                      <img
                        src={`http://localhost:7000/public/media/products/${product.productImg[0].img}`}
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
