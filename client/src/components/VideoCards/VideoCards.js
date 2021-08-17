import { useEffect, useState } from "react";
import Proptypes from "prop-types";
import { Box, Typography, Divider } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";

import VideoCard from "../VideoCard/VideoCard";

import ShurikenSpinner from "../ShurikenSpinner/ShurikenSpinner";

const VideoCards = ({
  videos: propsVideo,
  total,
  hasMore,
  fetchMore,
  onRemoveVideo,
  type,
}) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    setVideos(propsVideo);
  }, [propsVideo]);

  return (
    <>
      <Box padding={2}>
        <Typography>{`Total: ${total}`}</Typography>
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
            {videos.map(
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
  videos: Proptypes.array,
  total: Proptypes.number,
  hasMore: Proptypes.bool.isRequired,
  fetchMore: Proptypes.func.isRequired,
  onRemoveVideo: Proptypes.func.isRequired,
};

VideoCards.defaultProps = {
  videos: [],
  total: 0,
};

export default VideoCards;
