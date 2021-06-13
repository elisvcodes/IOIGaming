import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/index';
import Products from './pages/Products/index';
import Categories from './pages/Categories/index';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/categories" component={Categories} />
      </Switch>
    </>
  );
}

export default App;
