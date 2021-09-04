import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setVideoMode } from "../../actions/GlobalActions";
import { getClip } from "../../actions/ClipsActions";

import Video from "../../components/Video/Video";

import { VIDEO_TYPE_STREAM, VIDEO_TYPE_CLIP } from "../../constants/main";

const ClipContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clipAcc, setClipAcc] = useState(true);
  const [tabStatus, setTabStatus] = useState(0);
  const [videoPos, setVideoPos] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [currentClip, setCurrentClip] = useState({});
  const { id } = useParams();

  const { clip, clipLoading, notFound } = useSelector((state) => state.clips);

  useEffect(() => {
    dispatch(getClip(id));
    dispatch(setVideoMode(true));
    return () => {
      dispatch(setVideoMode(false));
    };
  }, [dispatch, id]);

  useEffect(() => {
    setCurrentClip(clip);
  }, [clip]);

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

  const handleRelatedVideoClick = (
    _id,
    videoId,
    existing,
    type = VIDEO_TYPE_STREAM
  ) => {
    if (existing) {
      navigate(`/${type}s/${_id}`);
    } else {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
    }
  };

  return (
    <Video
      video={currentClip}
      clipAcc={clipAcc}
      clipAccordionControl={clipAccordionControl}
      tabControl={tabControl}
      tabStatus={tabStatus}
      onVideoSeek={handleVideoSeek}
      videoPos={videoPos}
      onRelatedVideoClick={handleRelatedVideoClick}
      type={VIDEO_TYPE_CLIP}
      loading={clipLoading}
      notFound={notFound}
    />
  );
};

export default ClipContainer;
