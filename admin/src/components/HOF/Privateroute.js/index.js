import React from 'react';
import { Route } from 'react-router';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Cookies from 'js-cookie';

export default function Privateroute({ component: Component, ...others }) {
  const auth = useSelector((state) => state.auth);

  return (
    <>
      <Route
        {...others}
        component={(props) =>
          Cookies.get('user_token_jwt') ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </>
  );
}
