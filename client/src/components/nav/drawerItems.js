import { useMemo, forwardRef } from "react";
import { useLocation, Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faFilm,
  faTag,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

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
  disabled: PropTypes.bool,
  icon: PropTypes.element,
  primary: PropTypes.string,
  to: PropTypes.string,
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
          icon={<FontAwesomeIcon icon={faPlayCircle} size="lg" />}
        />
        <ListItemLink
          to="/clips"
          primary="Clips"
          icon={<FontAwesomeIcon icon={faFilm} size="lg" />}
        />
        <ListItemLink
          to="/music"
          primary="Music"
          icon={<FontAwesomeIcon icon={faMusic} size="lg" />}
        />
      </List>
      {localStorage.getItem("authToken") && (
        <>
          <Divider />
          <List>
            <ListItemLink
              to="/tags"
              primary="Tags"
              icon={<FontAwesomeIcon icon={faTag} size="lg" />}
            />
            <ListItemLink
              to="/artists"
              primary="Artists"
              icon={<FontAwesomeIcon icon={faMusic} size="lg" />}
            />
            <ListItemLink
              to="/songs"
              primary="Songs"
              icon={<FontAwesomeIcon icon={faMusic} size="lg" />}
            />
          </List>
        </>
      )}
    </div>
  );
};

export default DrawerItems;
