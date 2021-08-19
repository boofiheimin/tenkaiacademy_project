/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import moment from "moment";
import {
  getClips,
  getMoreClips,
  setClipsFilter,
  addClip,
  removeClip,
} from "../../actions/ClipsActions";
import { getTags } from "../../actions/TagsActions";
import { setVideoMode } from "../../actions/GlobalActions";

import Videos from "../../components/Videos/Videos";

import { useQuery } from "../../utils";

const ClipsRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [queriedStreams, setStreams] = useState([]);
  const { offset, hasMore, filter, clips, total } = useSelector(
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
    dispatch(setClipsFilter(newFilter));
  }, [location.search]);

  useEffect(() => {
    dispatch(setVideoMode(false));
    dispatch(getTags());
  }, []);

  useEffect(() => {
    dispatch(getClips(filter));
  }, [filter]);

  useEffect(() => {
    setStreams(clips);
  }, [clips]);

  const fetchMore = () => {
    dispatch(getMoreClips(filter, offset));
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

    navigate(`/clips${searchParams ? `?${searchParams}` : ""}`);
  };

  const handleAddClip = (videoId, srcVideoIds) => {
    dispatch(addClip(videoId, srcVideoIds, navigate));
  };

  const handleRemoveVideo = (id) => {
    dispatch(removeClip(id));
  };

  tags.sort(
    (a, b) => a.catId - b.catId || a.tagNameEN.localeCompare(b.tagNameEN)
  );

  return (
    <Videos
      type="clip"
      videos={queriedStreams}
      totalVideos={total}
      tags={tags}
      hasMore={hasMore}
      fetchMore={fetchMore}
      searchFilter={filter}
      onSubmit={handleOnSubmit}
      handleAddVideo={handleAddClip}
      handleRemoveVideo={handleRemoveVideo}
    />
  );
};

export default ClipsRoute;
