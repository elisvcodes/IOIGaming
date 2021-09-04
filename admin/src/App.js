import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/index';
import Products from './pages/Products/index';
import Categories from './pages/Categories/index';
import Login from './pages/Login/index';
import Pages from './pages/Pages/index';
import Orders from './pages/Orders/index';
import PageActions from './pages/Pages/PageActions/index';
import ProductActions from './pages/Products/ProductActions/index';
import OrderActions from './pages/Orders/OrderActions/index';
import { useDispatch } from 'react-redux';
import { isLoggedIn } from './_actions/auth';
import { getCategories } from './_actions/category';
import { getProducts } from './_actions/product';
import { getOrders } from './_actions/order';
import Privateroute from './components/HOF/Privateroute.js';
import { CssBaseline } from '@material-ui/core';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
    dispatch(isLoggedIn());
    // dispatch(getOrders());
  }, []);
  return (
    <>
      <CssBaseline />
      <Switch>
        <Privateroute exact path='/' component={Homepage} />
        <Privateroute path='/categories' component={Categories} />

        <Privateroute path='/products/add' component={ProductActions} />
        <Privateroute path='/products/edit/:id' component={ProductActions} />
        <Privateroute path='/products' component={Products} />

        <Privateroute path='/pages/add' component={PageActions} />
        <Privateroute path='/pages/edit/:id' component={PageActions} />
        <Privateroute path='/pages' component={Pages} />
        <Privateroute path='/orders/:on' component={OrderActions} />
        <Privateroute path='/orders' component={Orders} />

        <Route path='/login' component={Login} />
      </Switch>
    </>
  );
}

export default App;
