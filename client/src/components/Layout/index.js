import React from 'react';
import { Grid, Container } from '@material-ui/core';
import Header from './Header';
import Footer from './Footer';
export default function Layout({ children, sidebar }) {
  return sidebar ? (
    <>
      <Header />
      <Container>
        <Grid container>
          <Grid item sm={12} md={3}>
            sidebar
          </Grid>
          <Grid item sm={12} md={9}>
            {children}
          </Grid>
          <Footer />
        </Grid>
      </Container>
    </>
  ) : (
    <>
      <Header />
      <Grid container>
        <Grid item sm={12}>
          {children}
        </Grid>
        <Footer />
      </Grid>
    </>
  );
}
