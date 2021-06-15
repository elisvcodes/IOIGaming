import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/index';
import Products from './pages/Products/index';
import Categories from './pages/Categories/index';
import Login from './pages/Login/index';
import { useDispatch } from 'react-redux';
import { isLoggedIn } from './_actions/auth';
import Privateroute from './components/HOF/Privateroute.js';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedIn());
  });
  return (
    <>
      <Switch>
        <Privateroute exact path="/" component={Homepage} />
        <Privateroute path="/categories" component={Categories} />
        <Privateroute path="/products" component={Products} />
        <Route path="/login" component={Login} />
      </Switch>
    </>
  );
}

export default App;
