/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import moment from "moment";
import {
  getStreams,
  getMoreStreams,
  refetchAll,
  setStreamsFilter,
  addStream,
  removeStream,
} from "../../actions/StreamsActions";
import { getTags } from "../../actions/TagsActions";
import { setVideoMode } from "../../actions/GlobalActions";

import Videos from "../../components/Videos/Videos";

import { useQuery } from "../../utils";
import { VIDEO_TYPE_STREAM, VIDEOS_FETCH_LIMIT } from "../../constants/main";

const StreamsRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [queriedStreams, setStreams] = useState([]);
  const [filter, setFilter] = useState();
  const [offset, setOffset] = useState(0);
  const { hasMore, refetching, streams, total } = useSelector(
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
    // dispatch(setStreamsFilter(newFilter));
    dispatch(getStreams(newFilter));
    setFilter(newFilter);
  }, [location]);

  useEffect(() => {
    dispatch(setVideoMode(false));
    dispatch(getTags());
  }, []);

  useEffect(() => {
    setStreams(streams);
  }, [streams]);

  const fetchMore = () => {
    dispatch(getMoreStreams(filter, offset + VIDEOS_FETCH_LIMIT));
    setOffset(offset + VIDEOS_FETCH_LIMIT);
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
    if (uploader) searchArray = searchArray.concat(`uploader=${uploader}`);
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

  const handleAddStream = (videoId) => {
    dispatch(addStream(videoId, navigate));
  };

  const handleRemoveStream = (id) => {
    dispatch(removeStream(id));
  };

  tags.sort(
    (a, b) => a.catId - b.catId || a.tagNameEN.localeCompare(b.tagNameEN)
  );

  return (
    <Videos
      type={VIDEO_TYPE_STREAM}
      videos={queriedStreams}
      totalVideos={total}
      tags={tags}
      hasMore={hasMore}
      fetchMore={fetchMore}
      onRefetchAll={handleRefetchAll}
      refetching={refetching}
      searchFilter={filter}
      onSubmit={handleOnSubmit}
      handleAddVideo={handleAddStream}
      handleRemoveVideo={handleRemoveStream}
    />
  );
};

export default StreamsRoute;
