import React from 'react';
import { Grid, Container } from '@material-ui/core';
import Header from './Header';
import Footer from './Footer';
import Filter from '../Filter/index';
export default function Layout({ children, sidebar }) {
  return sidebar ? (
    <>
      <Header />
      <Container>
        <Grid container>
          <Grid item xs={12} md={3}>
            <Filter items={sidebar.props} />
          </Grid>
          <Grid item sm={12} md={9}>
            {children}
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </>
  ) : (
    <>
      <Header />
      <Grid container>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
