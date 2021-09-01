import React from 'react';
import { Grid, Link } from '@material-ui/core';
import './style.css';

export default function Products({ products }) {
  return (
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
  );
}
