import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setVideoMode } from "../../actions/GlobalActions";
import { getStream } from "../../actions/StreamsActions";

import Stream from "../../components/Stream/Stream";

const StreamContainer = ({ streamId }) => {
  const navigate = useNavigate();
  const [clipAcc, setClipAcc] = useState(true);
  const [tabStatus, setTabStatus] = useState(0);
  const [videoPos, setVideoPos] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [currentStream, setCurrentStream] = useState({});

  const { stream } = useSelector((state) => state.streams);

  useEffect(() => {
    setCurrentStream(stream);
    return () => {
      setCurrentStream({ relatedTweets: [] });
    };
  }, [stream]);

  const clipAccordionControl = () => {
    setClipAcc(!clipAcc);
  };

  const tabControl = (e, value) => {
    setTabStatus(value);
  };

  const goEdit = () => {
    navigate(`/streams/${streamId}/edit`);
  };

  const handleVideoSeek = (sec) => {
    // toggle allowed same timestamp to be pressed consecutively
    setToggle(!toggle);
    setVideoPos(sec);
  };

  const handleRelatedVideoClick = (id, videoId, existing) => {
    if (existing) {
      navigate(`/streams/${id}`);
    } else {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
    }
  };

  return (
    <Stream
      stream={currentStream}
      clipAcc={clipAcc}
      clipAccordionControl={clipAccordionControl}
      tabControl={tabControl}
      tabStatus={tabStatus}
      goEdit={goEdit}
      onVideoSeek={handleVideoSeek}
      videoPos={videoPos}
      onRelatedVideoClick={handleRelatedVideoClick}
    />
  );
};

StreamContainer.propTypes = {
  streamId: PropTypes.string,
};

StreamContainer.defaultProps = {
  streamId: "",
};

const StreamWrapper = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getStream(id));
    dispatch(setVideoMode(true));
    return () => {
      dispatch(setVideoMode(false));
    };
  }, [dispatch, id]);

  return <StreamContainer streamId={id} />;
};

export default StreamWrapper;
