import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  MenuItem,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});
export default function Header() {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flex: '1' }}>
            Admin Area
          </Typography>
          <MenuItem>
            <Button color="inherit">Logout</Button>
          </MenuItem>
        </Toolbar>
      </AppBar>
    </>
  );
}
