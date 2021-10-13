import { useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

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
  Alert,
} from "@mui/material";
import json2mq from "json2mq";
import DrawerItems from "./drawerItems";
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
  onSiteModeToggle,
}) => {
  const outletRef = useRef(null);
  const classes = useStyles();
  const theme = useTheme();
  const matchSize = useMediaQuery(theme.breakpoints.down("md"));
  const matchOrientation = useMediaQuery(json2mq({ orientation: "landscape" }));

  const matches = matchSize || videoMode;
  const phoneLandscape = matchSize && matchOrientation && videoMode;
  return (
    <div className={classes.root}>
      <CssBaseline />
      {!phoneLandscape && (
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {matches ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggleMobile}
                className={classes.menuButton}
                size="large"
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
                size="large"
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography variant="h6" noWrap className={classes.title}>
              Tenkai Academy Project
            </Typography>
            <IconButton onClick={onSiteModeToggle} size="large">
              <EmojiObjectsIcon />
            </IconButton>
            {isLogin && (
              <>
                <Typography className={classes.username}>{username}</Typography>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      )}

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
        <>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              ),
            }}
            open={open}
          >
            <Toolbar />
            <DrawerItems classes={classes} />
          </Drawer>
          <div
            className={open ? classes.drawerSide : classes.drawerSideClose}
          />
        </>
      )}
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {!phoneLandscape && <div className={classes.drawerHeader} />}

        <div className={classes.outlet}>
          <Outlet outletRef={outletRef} />
        </div>
      </main>
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
            onClick={onNotiClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Alert>
      </Snackbar>
    </div>
  );
};

Nav.propTypes = {
  open: PropTypes.bool.isRequired,
  openMobile: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  handleDrawerToggleMobile: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  isLogin: PropTypes.string.isRequired,
  username: PropTypes.string,
  openNoti: PropTypes.bool,
  notification: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
  }),
  onNotiClose: PropTypes.func,
  videoMode: PropTypes.bool,
  onSiteModeToggle: PropTypes.func,
};

Nav.defaultProps = {
  username: "",
  openNoti: false,
  notification: {
    type: "",
    message: "",
  },
  onNotiClose: () => {},
  videoMode: false,
  onSiteModeToggle: () => {},
};

export { OutletContext };

export default Nav;
