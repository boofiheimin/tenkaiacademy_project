/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import moment from "moment";
import {
  getClips,
  getMoreClips,
  addClip,
  removeClip,
} from "../../actions/clips.actions";
import { getTags } from "../../actions/tags.actions";
import { setVideoMode } from "../../actions/global.actions";

import Videos from "../../components/videos/videos";

import { useQuery } from "../../utils";
import { VIDEOS_FETCH_LIMIT, VIDEO_TYPE_CLIP } from "../../constants/main";

const ClipsRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [queriedStreams, setStreams] = useState([]);
  const [filter, setFilter] = useState();
  const [offset, setOffset] = useState(0);
  const { hasMore, clips, total, loading } = useSelector(
    (state) => state.clips
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
    dispatch(getClips(newFilter));
    setFilter(newFilter);
  }, [location]);

  useEffect(() => {
    dispatch(setVideoMode(false));
    dispatch(getTags(true));
  }, []);

  useEffect(() => {
    setStreams(clips);
  }, [clips]);

  const fetchMore = () => {
    dispatch(getMoreClips(filter, offset + VIDEOS_FETCH_LIMIT));
    setOffset(offset + VIDEOS_FETCH_LIMIT);
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
      const tagsId = submittedTags.map((tag) => `"${tag.tagId}"`);
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

    navigate(`/clips${searchParams ? `?${searchParams}` : ""}`);
  };

  const handleAddClip = (videoId, srcVideoIds, tag) => {
    dispatch(addClip(videoId, srcVideoIds, tag, navigate));
  };

  const handleRemoveVideo = (id) => {
    dispatch(removeClip(id));
  };

  tags.sort(
    (a, b) =>
      a.catId.localeCompare(b.catId) || a.tagNameEN.localeCompare(b.tagNameEN)
  );

  return (
    <Videos
      type={VIDEO_TYPE_CLIP}
      videos={queriedStreams}
      totalVideos={total}
      tags={tags}
      hasMore={hasMore}
      fetchMore={fetchMore}
      searchFilter={filter}
      onSubmit={handleOnSubmit}
      handleAddVideo={handleAddClip}
      handleRemoveVideo={handleRemoveVideo}
      loading={loading}
    />
  );
};

export default ClipsRoute;
