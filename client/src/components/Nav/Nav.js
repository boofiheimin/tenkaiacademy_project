import { useRef } from "react";
import Proptypes from "prop-types";
import clsx from "clsx";

import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import { Outlet } from "react-router-dom";
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  CssBaseline,
  useTheme,
  useMediaQuery,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import DrawerItems from "./DrawerItems";
import useStyles from "./styles";

// eslint-disable-next-line import/no-mutable-exports
let OutletContext;

const Nav = ({
  open,
  openMobile,
  handleDrawerToggle,
  handleDrawerToggleMobile,
  onLogout,
  isLogin,
  username,
  openNoti,
  notification,
  onNotiClose,
  videoMode,
}) => {
  const outletRef = useRef(null);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md")) || videoMode;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {matches ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggleMobile}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" noWrap className={classes.title}>
            Tenkai Academy Project
          </Typography>
          {isLogin && (
            <>
              <Typography className={classes.username}>{username}</Typography>
              <Button color="secondary" variant="contained" onClick={onLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {matches ? (
        <Drawer
          open={openMobile}
          onClose={handleDrawerToggleMobile}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <DrawerItems classes={classes} />
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <Toolbar />
          <DrawerItems classes={classes} />
        </Drawer>
      )}

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div className={classes.outlet} id="scrollableDiv">
          <Snackbar
            open={openNoti}
            onClose={onNotiClose}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              severity={notification.type}
              variant="filled"
              className={classes.snack}
            >
              {notification.message}
              <IconButton
                aria-label="close"
                color="inherit"
                className={classes.close}
                size="small"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Alert>
          </Snackbar>
          <Outlet outletRef={outletRef} />
        </div>
      </main>
    </div>
  );
};

Nav.propTypes = {
  open: Proptypes.bool.isRequired,
  openMobile: Proptypes.bool.isRequired,
  handleDrawerToggle: Proptypes.func.isRequired,
  handleDrawerToggleMobile: Proptypes.func.isRequired,
  onLogout: Proptypes.func.isRequired,
  isLogin: Proptypes.string.isRequired,
  username: Proptypes.string,
  openNoti: Proptypes.bool,
  notification: Proptypes.shape({
    type: Proptypes.string,
    message: Proptypes.string,
  }),
  onNotiClose: Proptypes.func,
  videoMode: Proptypes.bool,
};

Nav.defaultProps = {
  username: "",
  openNoti: false,
  notification: {
    type: "",
    message: "",
  },
  onNotiClose: false,
  videoMode: false,
};

export { OutletContext };

export default Nav;
