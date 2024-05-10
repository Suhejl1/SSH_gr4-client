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
} from "@material-ui/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../../assets/circles.png";
import useStyles from "./styles";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setOpen(true);
  };

  const handleLogoutConfirm = () => {
    setOpen(false);
    // Redirect to root path
    history.push("/");
  };

  const handleLogoutCancel = () => {
    setOpen(false);
  };

  // Condition to check if the current path is either "/" or "/signup"
  const hideNavbar =
    location.pathname === "/" || location.pathname === "/signup";

  // If hideNavbar is true, return null to not render the Navbar
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
            {/* Button for Home */}
            <IconButton
              className={classes.navbarButton} // Add the class here
              component={Link}
              to="/home"
              aria-label="Home"
              color="inherit"
            >
              <Home />
            </IconButton>

            {/* Button to add a new book */}
            <IconButton
              className={classes.navbarButton} // Add the class here
              component={Link}
              to="/add-book"
              aria-label="Add new book"
              color="inherit"
            >
              <LibraryAdd />
            </IconButton>

            {/* Button to view users */}
            <IconButton
              className={classes.navbarButton} // Add the class here
              component={Link}
              to="/users"
              aria-label="View users"
              color="inherit"
            >
              <Group />
            </IconButton>

            {/* Button to view shopping cart */}
            <IconButton
              className={classes.navbarButton} //Add the class here
              component={Link}
              to="/cart"
              aria-label="Show cart items"
              color="inherit"
            >
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* Logout button */}
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

      {/* Logout confirmation dialog */}
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