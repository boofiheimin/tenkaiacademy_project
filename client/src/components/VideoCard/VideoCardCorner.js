import Proptypes from "prop-types";
import { Box } from "@material-ui/core";

import {
  VideogameAsset,
  Forum,
  MusicNote,
  Assistant,
  Lock,
} from "@material-ui/icons";

import { GAME, TALK, MUSIC, PRIVATE } from "../../constants/videoTypes";

const typeReducer = (type) => {
  switch (type) {
    case GAME:
      return { color: "red", icon: <VideogameAsset color="action" /> };
    case TALK:
      return { color: "limegreen", icon: <Forum color="action" /> };
    case MUSIC:
      return { color: "deepskyblue", icon: <MusicNote color="action" /> };
    case PRIVATE:
      return { color: "gray", icon: <Lock color="action" /> };
    default:
      return { color: "gold", icon: <Assistant color="action" /> };
  }
};

const VideoCardCorner = ({ type }) => {
  const { color, icon } = typeReducer(type);
  return (
    <Box
      position="absolute"
      zIndex="1"
      bgcolor={color}
      padding={1}
      lineHeight="8px"
      right={0}
      borderRadius="0 0 0 4px"
    >
      {icon}
    </Box>
  );
};

VideoCardCorner.propTypes = {
  type: Proptypes.string,
};

VideoCardCorner.defaultProps = {
  type: "",
};

export default VideoCardCorner;
