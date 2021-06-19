import { Container, Grid } from '@material-ui/core';
import React from 'react';
import Sidebar from './Sidebar/index';
import Header from './Header/index';

export default function Layout({ children, sidebar }) {
  return (
    <>
      {sidebar ? (
        <>
          <Grid item sm={2}>
            <Sidebar />
          </Grid>
          <Grid item sm={10} style={{ marginLeft: 'auto' }}>
            <Header />
            {children}
          </Grid>
        </>
      ) : (
        <>
          <Header />
          <Container style={{ padding: '50px 0' }}>{children}</Container>
        </>
      )}
    </>
  );
}
