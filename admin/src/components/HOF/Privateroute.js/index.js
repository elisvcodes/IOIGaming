import React from 'react';
import { Route } from 'react-router';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

export default function Privateroute({ component: Component, ...others }) {
  const auth = useSelector((state) => state.auth);

  return (
    <>
      <Route
        {...others}
        component={(props) =>
          auth.isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    </>
  );
}
