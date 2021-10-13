import makeStyles from "@mui/styles/makeStyles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100vw",
    maxWidth: "100%",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  username: {
    marginRight: theme.spacing(2),
  },
  // necessary for content to be below app bar
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  drawerSide: {
    width: drawerWidth,
    height: "100%",
    overflowX: "hidden",
    flexShrink: 0,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerSideClose: {
    width: 0,
    overflowX: "hidden",
    flexShrink: 0,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerPaper: {
    position: "fixed",
    overflowX: "hidden",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(0),
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  listRoot: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  outlet: {
    flexGrow: 1,
  },
  close: {
    padding: 0,
    marginLeft: theme.spacing(2),
  },
  snack: {
    display: "flex",
    alignItems: "center",
  },
}));

export default useStyles;
