import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Youtube from "react-youtube";

import useStyles from "./styles";

const ResponsiveIframe = ({ videoId, videoPos, seekToggle }) => {
  const classes = useStyles();
  const [player, setPlayer] = useState(null);

  const onReady = (e) => {
    setPlayer(e.target);
  };

  const seekTime = (time = 0) => {
    player.seekTo(time);
  };

  useEffect(() => {
    if (player && videoPos !== null) {
      seekTime(videoPos);
    }
  }, [seekToggle, videoPos]);

  return (
    <div className={classes.container}>
      <Youtube
        videoId={videoId}
        onReady={onReady}
        opts={{ playerVars: { autoplay: 1 } }}
      />
    </div>
  );
};

ResponsiveIframe.propTypes = {
  videoId: PropTypes.string,
  videoPos: PropTypes.number,
  seekToggle: PropTypes.func,
};

ResponsiveIframe.defaultProps = {
  videoId: "",
  videoPos: null,
  seekToggle: () => {},
};

export default ResponsiveIframe;
