import { useRef, createContext } from "react";
import Proptypes from "prop-types";
import clsx from "clsx";

import MenuIcon from "@material-ui/icons/Menu";

import { Outlet } from "react-router-dom";
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  CssBaseline,
  Hidden,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

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
}) => {
  const outletRef = useRef(null);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  OutletContext = createContext(outletRef);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Hidden lgUp implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggleMobile}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden mdDown implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
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
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <Toolbar />
          <DrawerItems classes={classes} />
        </Drawer>
      ) : (
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
      )}

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div className={classes.outlet} id="scrollableDiv">
          <OutletContext.Provider>
            <Outlet outletRef={outletRef} />
          </OutletContext.Provider>
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
};

Nav.defaultProps = {
  username: "",
};

export { OutletContext };

export default Nav;
