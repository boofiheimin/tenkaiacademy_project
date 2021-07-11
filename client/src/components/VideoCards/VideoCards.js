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
          justifyContent="center"
        >
          {videos.map(
            (
              { title, thumbnail, tags, type, publishedAt, duration, videoId },
              i
            ) => (
              <VideoCard
                title={title}
                thumbnail={thumbnail}
                tags={tags}
                type={type}
                publishedAt={publishedAt}
                duration={duration}
                videoId={videoId}
                key={i}
              />
            )
          )}
        </Box>
      </InfiniteScroll>
    </div>
  );
};

export default VideoCards;
