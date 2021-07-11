import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getStreams, getMoreStreams } from "../../actions/StreamsActions";

import Streams from "../../components/Streams/Streams";

const StreamsRoute = () => {
  const dispatch = useDispatch();
  const { streams, offset, hasMore } = useSelector((state) => state.streams);

  useEffect(() => {
    dispatch(getStreams({}));
  }, [dispatch]);

  const fetchMore = () => {
    dispatch(getMoreStreams({}, offset));
  };

  return <Streams videos={streams} hasMore={hasMore} fetchMore={fetchMore} />;
};

export default StreamsRoute;
