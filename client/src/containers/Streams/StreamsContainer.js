import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getStreams } from "../../actions/StreamsActions";

import Streams from "../../components/Streams/Streams";

const StreamsRoute = () => {
  const dispatch = useDispatch();
  const streams = useSelector((state) => state.streams);

  useEffect(() => {
    dispatch(getStreams({}, 20, 0));
  }, [dispatch]);

  return <Streams videos={streams} />;
};

export default StreamsRoute;
