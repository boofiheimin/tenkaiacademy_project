import { useMemo, forwardRef } from "react";
import { useLocation, Link } from "react-router-dom";
import Proptypes from "prop-types";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import LabelIcon from "@material-ui/icons/Label";

import useStyles from "./styles";

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

ListItemLink.propTypes = {
  disabled: Proptypes.bool,
  icon: Proptypes.element,
  primary: Proptypes.string,
  to: Proptypes.string,
};

ListItemLink.defaultProps = {
  disabled: false,
  icon: null,
  primary: "",
  to: "",
};

const DrawerItems = () => {
  const classes = useStyles();
  return (
    <div className={classes.listRoot}>
      <List>
        <ListItemLink
          to="/streams"
          primary="Streams"
          icon={<VideoLibraryIcon />}
        />
      </List>
      {localStorage.getItem("authToken") && (
        <>
          <Divider />
          <List>
            <ListItemLink to="/tags" primary="Tags" icon={<LabelIcon />} />
          </List>
        </>
      )}
    </div>
  );
};

export default DrawerItems;
