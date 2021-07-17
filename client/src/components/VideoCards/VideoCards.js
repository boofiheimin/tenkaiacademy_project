import { useContext } from "react";
import Proptypes from "prop-types";
import { CircularProgress, Box } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";

import { OutletContext } from "../Nav/Nav";

import VideoCard from "./VideoCard";

const VideoCards = ({ videos, hasMore, fetchMore, onVideoCardClick }) => {
  const outletRef = useContext(OutletContext);

  return (
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
        scrollableTarget="scrollableDiv"
      >
        <Box
          display="grid"
          alignItems="center"
          gridTemplateColumns="repeat(auto-fit, 300px)"
          gridGap="10px"
          justifyContent="center"
        >
          {videos.map(
            ({ title, thumbnail, tags, type, publishedAt, duration, _id }) => (
              <VideoCard
                title={title}
                thumbnail={thumbnail}
                tags={tags}
                type={type}
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
};

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
