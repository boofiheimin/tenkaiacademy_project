import PropTypes from "prop-types";
import { Card, Typography, CardActionArea } from "@material-ui/core";

import useStyles from "./styles";
import { youtubeThumbnailGetter } from "../../helper";

const HorizontalVideoCard = ({
  title,
  uploader,
  videoId,
  thumbnail,
  onCardClick,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.actionArea} onClick={onCardClick}>
        <img
          src={thumbnail || youtubeThumbnailGetter(videoId)}
          alt="yt"
          className={classes.thumbnail}
        />
        <div className={classes.info}>
          <Typography className={classes.videoTitle}>{title}</Typography>
          <Typography className={classes.uploader}>{uploader}</Typography>
        </div>
      </CardActionArea>
    </Card>
  );
};

HorizontalVideoCard.propTypes = {
  title: PropTypes.string,
  uploader: PropTypes.string,
  onCardClick: PropTypes.func,
};

HorizontalVideoCard.defaultProps = {
  title: "",
  uploader: "",
  onCardClick: () => {},
};

export default HorizontalVideoCard;
