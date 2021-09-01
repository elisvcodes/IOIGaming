import React, { useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/index';
import Categories from './pages/Categories/index';
import Product from './pages/Product/index';
import Cart from './pages/Cart/index';
import OrderConfirmation from './pages/OrderConfirmation/index';
import Checkout from './pages/Checkout/index';
import SearchResult from './pages/SearchResult/index';

import { useDispatch } from 'react-redux';
import { getCategories } from './_actions/categories';
import { getCart } from './_actions/cart';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const promise = loadStripe(`${process.env.REACT_APP_STRIPE_P_KEY}`);
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getCart());
  }, [dispatch]);

  return (
    <div>
      <CssBaseline />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/cat/:slug' component={Categories} />
        <Route path='/products/:slug' component={Product} />
        <Route path='/cart' component={Cart} />
        <Route
          path='/checkout'
          render={(props) => (
            <Elements stripe={promise}>
              <Checkout {...props} />
            </Elements>
          )}
        />
        <Route path='/order-confirmation' component={OrderConfirmation} />
        <Route path='/search' component={SearchResult} />
      </Switch>
    </div>
  );
}
