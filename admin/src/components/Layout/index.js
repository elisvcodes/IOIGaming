import { Grid } from '@material-ui/core';
import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children, sidebar }) {
  return (
    <>
      <Grid item sm={2}>
        <Sidebar />
      </Grid>
      <Grid item sm={10} style={{ marginLeft: 'auto' }}>
        {children}
      </Grid>
    </>
  );
}
