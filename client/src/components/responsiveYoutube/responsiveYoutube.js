import PropTypes from "prop-types";
import { useState, useImperativeHandle, forwardRef } from "react";
import Youtube from "react-youtube";

import useStyles from "./styles";

import placeholder from "../../assets/images/Placeholder.jfif";

const ResponsiveIframe = forwardRef(
  ({ videoId, mirror, onNext, showPlaceholder }, ref) => {
    const classes = useStyles({ showPlaceholder });
    const [player, setPlayer] = useState(null);
    const [playerState, setPlayerState] = useState(-1);

    const handleReady = (e) => {
      setPlayer(e.target);
      if (videoId) {
        e.target.loadVideoById(videoId);
      }
    };

    const handleStateChange = () => {
      const state = player.getPlayerState();
      if (state === 0 && playerState !== -1) {
        onNext();
      }
      setPlayerState(state);
    };

    useImperativeHandle(ref, () => ({
      seekTime(time) {
        player.seekTo(time);
      },
      loadVideo(id, start, end) {
        if (player) {
          if (start && end) {
            player.loadVideoById({
              videoId: id,
              startSeconds: start,
              endSeconds: end,
            });
          } else {
            player.loadVideoById(id);
          }
        }
      },
    }));

    const renderCase = () => {
      if (mirror) {
        return <iframe src={mirror} allow="autoplay" title="mirror" />;
      }
      return (
        <>
          <img src={placeholder} alt="" />
          <Youtube
            onReady={handleReady}
            opts={{ playerVars: { autoplay: 1 } }}
            onStateChange={handleStateChange}
          />
        </>
      );
    };

    return <div className={classes.container}>{renderCase()}</div>;
  }
);

ResponsiveIframe.propTypes = {
  videoId: PropTypes.string,
  onNext: PropTypes.func,
  mirror: PropTypes.string,
  showPlaceholder: PropTypes.bool,
};

ResponsiveIframe.defaultProps = {
  videoId: "",
  mirror: "",
  onNext: () => {},
  showPlaceholder: false,
};

export default ResponsiveIframe;