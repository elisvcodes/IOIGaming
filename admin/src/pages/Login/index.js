import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout/index';
import Inputs from '../../components/UI/inputs/index';
import { login } from '../../_actions/auth';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Form from '../../components/UI/Form/index';
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

  const fields = [
    {
      type: 'email',
      name: 'email',
      label: 'email',
      variant: 'outlined',
      className: classes.input,
      value: creds.email,
      onChange,
      fullWidth: true,
      required: true,
    },
    {
      type: 'password',
      name: 'password',
      label: 'password',
      variant: 'outlined',
      value: creds.password,
      onChange,
      fullWidth: true,
      required: true,
    },
  ];

  return (
    <>
      <Layout>
        <Form onSubmit={(e) => onSubmit(e)} fields={fields} />
      </Layout>
    </>
  );
}
