import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getStreams,
  getMoreStreams,
  refetchAll,
} from "../../actions/StreamsActions";

import Streams from "../../components/Streams/Streams";

const StreamsRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { streams, offset, hasMore } = useSelector((state) => state.streams);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    dispatch(getStreams({}));
  }, [dispatch]);

  const fetchMore = () => {
    dispatch(getMoreStreams({}, offset));
  };

  const onVideoCardClick = (id) => {
    navigate(`/streams/${id}`);
  };

  const handleRefetchAll = () => {
    dispatch(refetchAll());
    forceUpdate();
  };

  return (
    <Streams
      videos={streams}
      hasMore={hasMore}
      fetchMore={fetchMore}
      onVideoCardClick={onVideoCardClick}
      handleRefetchAll={handleRefetchAll}
    />
  );
};

export default StreamsRoute;
