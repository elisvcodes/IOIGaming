import React, { useEffect } from 'react';
import Layout from './components/Layout';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import { useDispatch } from 'react-redux';
import { getCategories } from './_actions/categories';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div>
      <CssBaseline />
      <Switch>
        <Route exact path='/' component={Homepage} />
      </Switch>
    </div>
  );
}
