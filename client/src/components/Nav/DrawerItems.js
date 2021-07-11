import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import TheatersIcon from "@material-ui/icons/Theaters";
import { useMemo, forwardRef } from "react";
import { useLocation, Link } from "react-router-dom";

const ListItemLink = ({ disabled = false, icon, primary, to }) => {
  const location = useLocation();
  const renderLink = useMemo(
    () =>
      forwardRef((itemProps, ref) => <Link to={to} ref={ref} {...itemProps} />),
    [to]
  );

  return (
    <ListItem
      button
      selected={to === location.pathname}
      disabled={disabled ?? false}
      component={renderLink}
    >
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
  );
};

const DrawerItems = (classes) => {
  return (
    <div className={classes.listRoot}>
      <List>
        <ListItemLink
          to="/streams"
          primary={"Streams"}
          icon={<VideoLibraryIcon />}
        />
      </List>
    </div>
  );
};

export default DrawerItems;
