import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
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
      selected={location.pathname.indexOf(to) >= 0}
      disabled={disabled ?? false}
      component={renderLink}
    >
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
  );
};

const DrawerItems = ({ listRoot }) => (
  <div className={listRoot}>
    <List>
      <ListItemLink
        to="/streams"
        primary="Streams"
        icon={<VideoLibraryIcon />}
      />
    </List>
  </div>
);

export default DrawerItems;
