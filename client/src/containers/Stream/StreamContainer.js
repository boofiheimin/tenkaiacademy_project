import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { getStream } from "../../actions/StreamsActions";

import Stream from "../../components/Stream/Stream";

const StreamContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clipAcc, setClipAcc] = useState(true);
  const [tabStatus, setTabStatus] = useState(0);
  const { stream, refetching } = useSelector((state) => state.streams);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getStream(id));
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
      refetching={refetching}
    />
  );
};

export default StreamContainer;
