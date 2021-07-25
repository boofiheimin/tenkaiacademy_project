/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import moment from "moment";
import {
  getStreams,
  getMoreStreams,
  refetchAll,
  setStreamsFilter,
} from "../../actions/StreamsActions";
import { getTags } from "../../actions/TagsActions";
import { setVideoMode } from "../../actions/GlobalActions";

import Streams from "../../components/Streams/Streams";

import { useQuery } from "../../utils";

const StreamsRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [queriedStreams, setStreams] = useState([]);
  const { offset, hasMore, refetching, filter, streams, total } = useSelector(
    (state) => state.streams
  );
  const tags = useSelector((state) => state.tags);
  const query = useQuery();
  const location = useLocation();

  useEffect(() => {
    const newFilter = {
      title: query.get("title") || "",
      tags: JSON.parse(query.get("tags")) || [],
      uploader: query.get("uploader") || "",
      from: query.get("from") ? moment(query.get("from")).toDate() : null,
      to: query.get("to") ? moment(query.get("to")).toDate() : null,
      sort: query.get("sort") || -1,
    };
    dispatch(setStreamsFilter(newFilter));
  }, [location.search]);

  useEffect(() => {
    dispatch(setVideoMode(false));
    dispatch(getTags());
  }, []);

  useEffect(() => {
    dispatch(getStreams(filter));
  }, [filter]);

  useEffect(() => {
    setStreams(streams);
  }, [streams]);

  const fetchMore = () => {
    dispatch(getMoreStreams(filter, offset));
  };

  const handleRefetchAll = () => {
    dispatch(refetchAll());
  };

  const handleOnSubmit = ({
    title,
    tags: submittedTags,
    uploader,
    from,
    to,
    sort,
  }) => {
    let searchArray = [];
    if (title) searchArray = searchArray.concat(`title=${title}`);
    if (submittedTags.length > 0) {
      const tagsId = submittedTags.map((tag) => tag.tagId);
      searchArray = searchArray.concat(`tags=[${tagsId.toString()}]`);
    }
    if (uploader) searchArray.concat(`uploader=${uploader}`);
    if (from) {
      const fromString = moment(from).format("YYYYMMDD");
      searchArray = searchArray.concat(`from=${fromString}`);
    }
    if (to) {
      const fromString = moment(to).format("YYYYMMDD");
      searchArray = searchArray.concat(`to=${fromString}`);
    }
    if (sort !== -1) searchArray = searchArray.concat(`sort=${sort}`);

    const searchParams = searchArray.join("&");

    navigate(`/streams${searchParams ? `?${searchParams}` : ""}`);
  };

  return (
    <Streams
      streams={queriedStreams}
      totalStreams={total}
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

export default StreamsRoute;
