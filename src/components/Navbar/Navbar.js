// src/components/Navbar/Navbar.js
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import {
  ShoppingCart,
  LibraryAdd,
  Group,
  Home,
  ExitToApp as ExitToAppIcon,
  Favorite as FavoriteIcon
} from "@material-ui/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../../assets/circles.png";
import useStyles from "./styles";
import AddBook from "../AddBook/add-book";
import CheckUsers from "../CheckUsers/check-users";

const userR = sessionStorage.getItem('role');

const Navbar = ({ totalItems, userRole = userR }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('role');
    setOpen(true);
  };

  const handleLogoutConfirm = () => {
    setOpen(false);
    sessionStorage.removeItem('role');
    window.history.replaceState(null, null, '/');
    window.location.href = '/';
    history.push("/");
  };

  const handleLogoutCancel = () => {
    setOpen(false);
  };

  const hideNavbar = location.pathname === "/" || location.pathname === "/signup";

  if (hideNavbar) {
    return null;
  }

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar className={classes.toolbar}>
          <Typography
            component={Link}
            to="/home"
            variant="h5"
            className={classes.title}
            color="inherit"
          >
            <img src={logo} alt="Book Store App" className={classes.image} />
            <div>BOOKSHOP</div>
          </Typography>

          <div className={classes.buttonContainer}>
            <IconButton
              className={classes.navbarButton}
              component={Link}
              to="/home"
              aria-label="Home"
              color="inherit"
            >
              <Home />
            </IconButton>

            <IconButton
              className="{classes.navbarButton}"
              component={Link}
              to="/wishlist"
              aria-label="Wishlist"
              color="inherit"
            >
              <FavoriteIcon />
            </IconButton>

            {userRole === 'ADMIN' && (
              <IconButton
                className={classes.navbarButton}
                component={Link}
                to="/add-book"
                aria-label="Add new book"
                color="inherit"
              >
                <LibraryAdd />
              </IconButton>
            )}

            {userRole === 'ADMIN' && (
              <IconButton
                className={classes.navbarButton}
                component={Link}
                to="/users"
                aria-label="View users"
                color="inherit"
              >
                <Group />
              </IconButton>
            )}

            <IconButton
              className={classes.navbarButton}
              component={Link}
              to="/cart"
              aria-label="Show cart items"
              color="inherit"
            >
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            <IconButton
              className={classes.navbarButton}
              component={Link}
              to="/faq"
              aria-label="FAQ"
              color="inherit"
            >
              <Typography>FAQ</Typography>
            </IconButton>

            <IconButton
              className={classes.logoutButton}
              aria-label="Log out"
              color="inherit"
              onClick={handleLogout}
            >
              <ExitToAppIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Dialog
        open={open}
        onClose={handleLogoutCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Log out?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Navbar;
