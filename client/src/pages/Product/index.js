import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/index';
import { Container, Grid, Button } from '@material-ui/core';
import axios from 'axios';
import './style.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { addToCart } from '../../_actions/cart';
import { useDispatch } from 'react-redux';
import config from '../../util/config';

export default function Product(props) {
  const [productData, setProductData] = useState({});
  const dispatch = useDispatch();
  useEffect(async () => {
    const { data } = await axios.get(
      `${config.SERVER_URI}/api/v1/product/${props.match.params.slug}`
    );
    setProductData(data);
  }, []);

  return (
    <>
      <Layout>
        <Container>
          <Grid container className='productContainer'>
            <Grid item xs={12} sm={12} md={8}>
              <Carousel
                showThumbs={false}
                autoPlay={true}
                infiniteLoop={true}
                stopOnHover={true}
                showStatus={false}
                useKeyboardArrows={true}
                showIndicators={true}
              >
                {productData.productImg &&
                  productData.productImg.map((image, idx) => {
                    return (
                      <div className='slidercontainer' key={idx}>
                        <img src={`${image.imageUrl}`} />
                      </div>
                    );
                  })}
              </Carousel>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <h1 className='title'>{productData.name}</h1>
              <p className='sku'>
                SKU: <span className='skuspan'> {productData.sku}</span>
              </p>
              <span className='price'>${productData.price}</span>
              <div>
                <Button
                  fullWidth
                  color='primary'
                  variant='contained'
                  onClick={() =>
                    dispatch(
                      addToCart({
                        item: productData._id,
                        quantity: 1,
                        total: productData.price,
                      })
                    )
                  }
                >
                  Add To Cart
                </Button>
              </div>
            </Grid>
            <div className='productDescription'>
              <h3>Product Description</h3>
              <p>{productData.longDescription}</p>
            </div>
          </Grid>
        </Container>
      </Layout>
    </>
  );
}
