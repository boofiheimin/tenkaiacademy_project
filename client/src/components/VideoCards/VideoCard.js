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

import VideoCardCorner from "./VideoCardCorner";

import useStyles from "./styles";

const VideoCard = ({ title, thumbnail, type, tags, publishedAt }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <VideoCardCorner type={type} />
      <CardActionArea>
        <CardMedia
          component="img"
          alt="videoThumb"
          height="169"
          image={thumbnail}
          title="videoThumb"
        />
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
