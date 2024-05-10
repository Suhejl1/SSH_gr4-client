import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 0;

export default makeStyles((theme) => ({
  appBar: {
    color: "white",
    boxShadow: "none",
    background: "#001524",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 0.5),
    },
  },
  title: {
    alignItems: "center",
    display: "flex",
    fontFamily: "Raleway",
    fontWeight: 600,
    letterSpacing: 1,
    textDecoration: "none",
    marginRight: theme.spacing(1),
    "&:hover": {
      color: "#ffff",
      boxShadow: "none",
    },
  },
  image: {
    marginRight: theme.spacing(1),
    height: "30px",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing(1),
  },
  navbarButton: {
    padding: theme.spacing(1), // Adjust the padding as needed
    marginLeft: theme.spacing(1), // Adjust the margin as needed
    "&:hover": {
      backgroundColor: theme.palette.primary.main, // Change the background color on hover
      color: theme.palette.primary.contrastText, // Change the text color on hover
    },
  },
  logoutButton: {
    padding: theme.spacing(1), // Ensure consistent padding for the IconButton
    "& > .MuiIconButton-label": {
      width: "auto", // Set width to auto to adjust button width according to its content
    },
  },
}));
