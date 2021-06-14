import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Drawer, ListItem, List, ListItemText } from '@material-ui/core/';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  //   root: {
  //     display: 'flex',
  //   },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },

  links: {
    color: 'black',
    textDecoration: 'none',
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          <Link to="/" className={classes.links}>
            <ListItem button>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link to="/categories" className={classes.links}>
            <ListItem button>
              <ListItemText primary="Categories" />
            </ListItem>
          </Link>
          <Link to="/products" className={classes.links}>
            <ListItem button>
              <ListItemText primary="Products" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </>
  );
}
