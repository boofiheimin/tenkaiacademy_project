import { CircularProgress, Box } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";

import VideoCard from "./VideoCard";

const VideoCards = ({ videos, hasMore, fetchMore }) => (
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
          ({ title, thumbnail, tags, type, publishedAt, duration, _id }, i) => (
            <VideoCard
              title={title}
              thumbnail={thumbnail}
              tags={tags}
              type={type}
              publishedAt={publishedAt}
              duration={duration}
              id={_id}
              key={_id}
            />
          )
        )}
      </Box>
    </InfiniteScroll>
  </div>
);

export default VideoCards;
