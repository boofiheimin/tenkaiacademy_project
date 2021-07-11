import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Box,
} from "@material-ui/core";
import HistoryIcon from "@material-ui/icons/History";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import VideoCardCorner from "./VideoCardCorner";

import useStyles from "./styles";

const durationFormat = (duration) => {
  if (duration < 3600) {
    return moment("2015-01-01").startOf("day").seconds(duration).format("m:ss");
  } else
    return moment("2015-01-01")
      .startOf("day")
      .seconds(duration)
      .format("H:mm:ss");
};

const VideoCard = ({
  title,
  thumbnail,
  type,
  tags,
  publishedAt,
  duration,
  videoId,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Card className={classes.root}>
      <VideoCardCorner type={type} />
      <CardActionArea onClick={() => navigate(`/streams/${videoId}`)}>
        <Box position="relative">
          <CardMedia
            component="img"
            alt="videoThumb"
            height="169"
            image={thumbnail}
            title="videoThumb"
            className={classes.cardMedia}
          />
          <Box
            position="absolute"
            className={classes.duration}
            bottom={0}
            right={0}
            color="white"
            bgcolor="black"
            padding="2px"
          >
            {durationFormat(duration)}
          </Box>
        </Box>
        <CardContent className={classes.content}>
          <Typography
            gutterBottom
            component="h2"
            className={classes.videoTitle}
          >
            {title}
          </Typography>
          <Box display="flex" color="darkgray" lineHeight="16px">
            <HistoryIcon className={classes.historyIcon} />
            <Typography>{moment(publishedAt).fromNow()}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        {tags.slice(0, 2).map(({ name }, i) => (
          <Chip label={name} key={i} />
        ))}
      </CardActions>
    </Card>
  );
};

export default VideoCard;
