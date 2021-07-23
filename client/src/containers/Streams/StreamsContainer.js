/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getStreams,
  getMoreStreams,
  refetchAll,
} from "../../actions/StreamsActions";
import { setVideoMode } from "../../actions/GlobalActions";

import Streams from "../../components/Streams/Streams";

const StreamsRoute = ({ streams: propStreams }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [streams, setStreams] = useState([]);
  const { offset, hasMore, refetching } = useSelector((state) => state.streams);

  useEffect(() => {
    setStreams(propStreams);
  });

  const fetchMore = () => {
    dispatch(getMoreStreams({}, offset));
  };

  const onVideoCardClick = (id) => {
    navigate(`/streams/${id}`);
  };

  const handleRefetchAll = () => {
    dispatch(refetchAll());
  };

  return (
    <Streams
      videos={streams}
      hasMore={hasMore}
      fetchMore={fetchMore}
      onVideoCardClick={onVideoCardClick}
      handleRefetchAll={handleRefetchAll}
      refetching={refetching}
    />
  );
};

const StreamsWrapper = () => {
  const dispatch = useDispatch();
  const { streams } = useSelector((state) => state.streams);
  useEffect(() => {
    dispatch(setVideoMode(false));
    dispatch(getStreams({}));
  }, [dispatch]);

  return <StreamsRoute streams={streams} />;
};

export default StreamsWrapper;
