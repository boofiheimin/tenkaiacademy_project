import Proptypes from "prop-types";
import { CircularProgress, Box } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";

import VideoCard from "../VideoCard/VideoCard";

const VideoCards = ({ videos, hasMore, fetchMore, onVideoCardClick }) => (
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
      loader={<CircularProgress />}
    >
      <Box
        display="grid"
        alignItems="center"
        gridTemplateColumns="repeat(auto-fit, 300px)"
        gridGap="10px"
        justifyContent="center"
      >
        {videos.map(
          ({ title, thumbnail, tags, publishedAt, duration, _id }) => (
            <VideoCard
              title={title}
              thumbnail={thumbnail}
              tags={tags}
              publishedAt={publishedAt}
              duration={duration}
              id={_id}
              key={_id}
              onVideoCardClick={onVideoCardClick}
            />
          )
        )}
      </Box>
    </InfiniteScroll>
  </div>
);

VideoCards.propTypes = {
  videos: Proptypes.array,
  hasMore: Proptypes.bool.isRequired,
  fetchMore: Proptypes.func.isRequired,
  onVideoCardClick: Proptypes.func.isRequired,
};

VideoCards.defaultProps = {
  videos: [],
};

export default VideoCards;
