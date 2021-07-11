import { CircularProgress, Box } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";

import VideoCard from "./VideoCard";

const VideoCards = ({ videos, hasMore, fetchMore }) => {
  return (
    <div>
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
        >
          {videos.map(
            ({ title, thumbnail, tags, type, publishedAt, duration }, i) => (
              <VideoCard
                title={title}
                thumbnail={thumbnail}
                tags={tags}
                type={type}
                publishedAt={publishedAt}
                duration={duration}
              />
            )
          )}
        </Box>
      </InfiniteScroll>
    </div>
  );
};

export default VideoCards;
