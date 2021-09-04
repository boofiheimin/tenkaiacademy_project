import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Divider } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";

import VideoCard from "../videoCard/videoCard";

import ShurikenSpinner from "../shurikenSpinner/shurikenSpinner";

import { VIDEO_TYPE_STREAM } from "../../constants/main";

const VideoCards = ({
  videos: propsVideo,
  total,
  hasMore,
  fetchMore,
  onRemoveVideo,
  type,
  loading,
}) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(propsVideo);
  }, [propsVideo]);

  return (
    <>
      <Box padding={2}>
        <Typography>{loading ? "loading..." : `Total: ${total}`}</Typography>
        <Divider />
      </Box>
      <div
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <InfiniteScroll
          style={{ overflow: "hidden" }}
          dataLength={videos.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={<ShurikenSpinner />}
        >
          <Box
            display="grid"
            alignItems="center"
            gridTemplateColumns="repeat(auto-fit, 300px)"
            gridGap="10px"
            justifyContent="center"
          >
            {!loading &&
              videos.map(
                ({
                  title,
                  thumbnail,
                  tags,
                  publishedAt,
                  duration,
                  _id,
                  uploader,
                }) => (
                  <VideoCard
                    type={type}
                    title={title}
                    thumbnail={thumbnail}
                    tags={tags}
                    publishedAt={publishedAt}
                    duration={duration}
                    id={_id}
                    key={_id}
                    uploader={uploader}
                    onRemove={onRemoveVideo}
                  />
                )
              )}
          </Box>
        </InfiniteScroll>
      </div>
    </>
  );
};
VideoCards.propTypes = {
  videos: PropTypes.array,
  total: PropTypes.number,
  hasMore: PropTypes.bool.isRequired,
  fetchMore: PropTypes.func.isRequired,
  onRemoveVideo: PropTypes.func.isRequired,
  type: PropTypes.string,
  loading: PropTypes.bool,
};

VideoCards.defaultProps = {
  videos: [],
  total: 0,
  type: VIDEO_TYPE_STREAM,
  loading: true,
};

export default VideoCards;
