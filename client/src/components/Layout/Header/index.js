import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Container,
  Link,
} from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import './style.css';
export default function Header() {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const totalCartItems = cart.items;
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
                IoI
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
            <Typography component={'span'}>
              <div className='cartIcon'>
                <Link href='/cart' color='inherit'>
                  <span className='cartItems'>{totalCartItems.length} </span>
                  <AiOutlineShoppingCart size={25} />
                </Link>
              </div>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
