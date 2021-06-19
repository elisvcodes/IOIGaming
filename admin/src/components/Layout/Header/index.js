import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  MenuItem,
  makeStyles,
} from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../../_actions/auth';
const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});
export default function Header() {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flex: '1' }}>
            Admin Area
          </Typography>
          <MenuItem>
            {auth.isLoggedIn ? (
              <Button color="inherit" onClick={() => dispatch(logout(history))}>
                Logout
              </Button>
            ) : (
              <Button color="inherit">Login</Button>
            )}
          </MenuItem>
        </Toolbar>
      </AppBar>
    </>
  );
}
