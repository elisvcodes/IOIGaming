import {
  Button,
  FormControl,
  TextField,
  Container,
  makeStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout';
import Inputs from '../../components/UI/inputs/index';
import { login } from '../../_actions/auth';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
const useStyles = makeStyles({
  input: {
    margin: '10px 0',
  },
});

export default function Login() {
  const classes = useStyles();

  const [creds, setCreds] = useState({ email: '', password: '' });

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const onChange = (e) => {
    const { name, value } = e.target;
    setCreds({ ...creds, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(creds));
  };

  if (auth.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Layout>
        <form onSubmit={onSubmit}>
          <div>
            <Inputs
              type="email"
              name="email"
              label="email"
              variant="outlined"
              className={classes.input}
              value={creds.email}
              onChange={onChange}
              fullWidth
              required={true}
            />
          </div>

          <div>
            <Inputs
              type="password"
              name="password"
              label="password"
              variant="outlined"
              className={classes.input}
              value={creds.password}
              onChange={onChange}
              fullWidth
              required={true}
            />
          </div>

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </Layout>
    </>
  );
}
