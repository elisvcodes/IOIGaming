import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Container,
  Link,
} from '@material-ui/core';
import React from 'react';

export default function Header() {
  return (
    <>
      <AppBar position='relative' elevation={0}>
        <Container>
          <Toolbar
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography>
              <Link href='/' color='inherit' underline='none'>
                {' '}
                ZebraShop
              </Link>
            </Typography>
            <InputBase
              placeholder='Search…'
              inputProps={{ 'aria-label': 'search' }}
              style={{
                width: '500px',
                borderRadius: '1%',
                paddingLeft: '15px',
                background: 'white',
              }}
            />
            <Typography>Cart</Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
