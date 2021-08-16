import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setVideoMode } from "../../actions/GlobalActions";
import { getStream } from "../../actions/StreamsActions";

import Video from "../../components/Video/Video";

const StreamContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clipAcc, setClipAcc] = useState(true);
  const [tabStatus, setTabStatus] = useState(0);
  const [videoPos, setVideoPos] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [currentStream, setCurrentStream] = useState({});
  const { id } = useParams();

  const { stream } = useSelector((state) => state.streams);

  useEffect(() => {
    dispatch(getStream(id));
    dispatch(setVideoMode(true));
    return () => {
      dispatch(setVideoMode(false));
    };
  }, [dispatch, id]);

  useEffect(() => {
    setCurrentStream(stream);
  }, [stream]);

  const clipAccordionControl = () => {
    setClipAcc(!clipAcc);
  };

  const tabControl = (e, value) => {
    setTabStatus(value);
  };

  const handleVideoSeek = (sec) => {
    // toggle allowed same timestamp to be pressed consecutively
    setToggle(!toggle);
    setVideoPos(sec);
  };

  const handleRelatedVideoClick = (_id, videoId, existing) => {
    if (existing) {
      navigate(`/streams/${_id}`);
    } else {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
    }
  };

  return (
    <Video
      video={currentStream}
      clipAcc={clipAcc}
      clipAccordionControl={clipAccordionControl}
      tabControl={tabControl}
      tabStatus={tabStatus}
      onVideoSeek={handleVideoSeek}
      videoPos={videoPos}
      onRelatedVideoClick={handleRelatedVideoClick}
      type="stream"
    />
  );
};

export default StreamContainer;
