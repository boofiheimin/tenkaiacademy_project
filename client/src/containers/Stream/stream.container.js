import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setVideoMode } from "../../actions/GlobalActions";
import { getStream } from "../../actions/StreamsActions";

import Video from "../../components/Video/Video";

import { VIDEO_TYPE_STREAM } from "../../constants/main";

const StreamContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clipAcc, setClipAcc] = useState(true);
  const [tabStatus, setTabStatus] = useState(0);
  const [currentStream, setCurrentStream] = useState({});
  const { id } = useParams();

  const { stream, streamLoading, notFound } = useSelector(
    (state) => state.streams
  );

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
      video={currentStream}
      clipAcc={clipAcc}
      clipAccordionControl={clipAccordionControl}
      tabControl={tabControl}
      tabStatus={tabStatus}
      onRelatedVideoClick={handleRelatedVideoClick}
      type={VIDEO_TYPE_STREAM}
      loading={streamLoading}
      notFound={notFound}
    />
  );
};

export default StreamContainer;
