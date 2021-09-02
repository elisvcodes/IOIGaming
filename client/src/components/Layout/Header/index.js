import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Container,
  Link,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import './style.css';
import { AiOutlineSearch } from 'react-icons/ai';

export default function Header() {
  const cart = useSelector((state) => state.cart);
  const [q, setQ] = useState('');
  const history = useHistory();
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
            <form
              action=''
              onSubmit={(e) => history.push(`/search/?q=${q}`)}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '70%',
              }}
            >
              <InputBase
                placeholder='Search…'
                name='q'
                value={q}
                onChange={(e) => setQ(e.target.value)}
                inputProps={{ 'aria-label': 'search' }}
                style={{
                  borderRadius: '1%',
                  background: 'white',
                }}
                startAdornment={
                  <button
                    style={{
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                    }}
                    type='submit'
                  >
                    <AiOutlineSearch color='black' size={20} />
                  </button>
                }
                fullWidth
              />
            </form>
            <Typography component={'span'}>
              <div className='cartIcon'>
                <Link href='/cart' color='inherit'>
                  <span className='cartItems'>
                    {cart.items.reduce((acc, cur) => acc + cur.quantity, 0)}{' '}
                  </span>
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
