/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getStreams,
  getMoreStreams,
  refetchAll,
  setStreamsFilter,
} from "../../actions/StreamsActions";
import { getTags } from "../../actions/TagsActions";
import { setVideoMode } from "../../actions/GlobalActions";

import Streams from "../../components/Streams/Streams";

const StreamsRoute = ({ streams: propStreams, totalStreams }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [streams, setStreams] = useState([]);
  const { offset, hasMore, refetching, filter } = useSelector(
    (state) => state.streams
  );
  const tags = useSelector((state) => state.tags);

  useEffect(() => {
    setStreams(propStreams);
  }, [propStreams]);

  const fetchMore = () => {
    dispatch(getMoreStreams(filter, offset));
  };

  const handleRefetchAll = () => {
    dispatch(refetchAll());
  };

  const handleOnSubmit = (value) => {
    dispatch(setStreamsFilter(value));
  };

  return (
    <Streams
      streams={streams}
      totalStreams={totalStreams}
      tags={tags}
      hasMore={hasMore}
      fetchMore={fetchMore}
      onRefetchAll={handleRefetchAll}
      refetching={refetching}
      searchFilter={filter}
      onSubmit={handleOnSubmit}
    />
  );
};

StreamsRoute.propTypes = {
  streams: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      thumbnail: PropTypes.string,
      tags: PropTypes.array,
      publishedAt: PropTypes.string,
      duration: PropTypes.number,
      _id: PropTypes.string,
    })
  ),
  totalStreams: PropTypes.number,
};

StreamsRoute.defaultProps = {
  streams: [],
  totalStreams: 0,
};

const StreamsWrapper = () => {
  const dispatch = useDispatch();
  const { streams, total, filter } = useSelector((state) => state.streams);
  useEffect(() => {
    dispatch(setVideoMode(false));
    dispatch(getStreams(filter));
    dispatch(getTags());
  }, [dispatch]);

  return <StreamsRoute streams={streams} totalStreams={total} />;
};

export default StreamsWrapper;
