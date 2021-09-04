import PropTypes from "prop-types";

import { Chip } from "@material-ui/core";

import {
  GAME,
  TALK,
  MUSIC,
  VARIETY,
  SHORT,
  COLLAB,
} from "../../constants/videoTypes";

import useStyles from "./styles";

const typeReducer = (type) => {
  switch (type) {
    case GAME:
      return "#D21404";
    case TALK:
      return "deepskyblue";
    case MUSIC:
      return "violet";
    case VARIETY:
      return "#FFBF00";
    case SHORT:
      return "#03AC13";
    case COLLAB:
      return "#f88379";
    default:
      return null;
  }
};

const TypeChip = ({ label, isCard, ...props }) => {
  const classes = useStyles({ bgColor: typeReducer(label), isCard });
  return <Chip label={label} {...props} className={classes.root} />;
};

TypeChip.propTypes = {
  label: PropTypes.string,
  isCard: PropTypes.bool,
};
TypeChip.defaultProps = {
  label: "",
  isCard: false,
};

export default TypeChip;
