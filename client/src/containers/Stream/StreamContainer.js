import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setVideoMode } from "../../actions/GlobalActions";
import { getStream } from "../../actions/StreamsActions";

import Stream from "../../components/Stream/Stream";

const StreamContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clipAcc, setClipAcc] = useState(true);
  const [tabStatus, setTabStatus] = useState(0);
  const [videoPos, setVideoPos] = useState(null);
  const [toggle, setToggle] = useState(false);
  const { stream } = useSelector((state) => state.streams);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getStream(id));
    dispatch(setVideoMode(true));
    return () => {
      dispatch(setVideoMode(false));
    };
  }, [dispatch, id]);

  const clipAccordionControl = () => {
    setClipAcc(!clipAcc);
  };

  const tabControl = (e, value) => {
    setTabStatus(value);
  };

  const goBack = () => {
    navigate("/streams");
  };
  const goEdit = () => {
    navigate(`/streams/${id}/edit`);
  };

  const handleVideoSeek = (sec) => {
    // toggle allowed same timestamp to be pressed consecutively
    setToggle(!toggle);
    setVideoPos(sec);
  };

  return (
    <Stream
      stream={stream}
      clipAcc={clipAcc}
      clipAccordionControl={clipAccordionControl}
      tabControl={tabControl}
      tabStatus={tabStatus}
      goBack={goBack}
      goEdit={goEdit}
      isLogin={localStorage.getItem("authToken")}
      onVideoSeek={handleVideoSeek}
      videoPos={videoPos}
    />
  );
};

export default StreamContainer;
