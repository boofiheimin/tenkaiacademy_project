import { useState } from "react";
import PropTypes from "prop-types";

import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Box,
  Divider,
  Button,
} from "@material-ui/core";
import HistoryIcon from "@material-ui/icons/History";
import moment from "moment";

import useStyles from "./styles";
import ConfirmationPopper from "../confirmationPopper/confirmationPopper";

import TypeChip from "../typeChip/typeChip";

import { VIDEO_TYPE_STREAM } from "../../constants/main";

const durationFormat = (duration) => {
  if (duration < 3600) {
    return moment("2015-01-01").startOf("day").seconds(duration).format("m:ss");
  }
  return moment("2015-01-01")
    .startOf("day")
    .seconds(duration)
    .format("H:mm:ss");
};

const VideoCard = ({
  type,
  title,
  thumbnail,
  tags,
  publishedAt,
  duration,
  id,
  onRemove,
  uploader,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleRemoveClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handlePopperConfirm = () => {
    onRemove(id);
    setAnchorEl(null);
  };
  const handlePopperCancel = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea href={`/${type}s/${id}`}>
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
          <Box
            display="flex"
            color="darkgray"
            lineHeight="16px"
            alignItems="center"
          >
            <HistoryIcon className={classes.historyIcon} />
            <Typography>{moment(publishedAt).fromNow()}</Typography>
          </Box>
          <Box paddingTop={1} paddingBottom={1}>
            <Typography className={classes.uploader}>{uploader}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        {!localStorage.getItem("authToken") && tags.length === 0 && (
          <Chip className={classes.invisiblechip} />
        )}
        {tags.slice(0, 2).map(({ tagNameEN }) => (
          <TypeChip label={tagNameEN} key={Date.now() + Math.random()} isCard />
        ))}
      </CardActions>
      <Divider />

      {localStorage.getItem("authToken") && (
        <CardActions className={classes.cardActions}>
          <Button
            className={classes.actionbtn}
            variant="outlined"
            href={`/${type}s/${id}/edit`}
          >
            Edit
          </Button>
          <Button
            className={classes.actionbtn}
            variant="outlined"
            color="secondary"
            onClick={handleRemoveClick}
          >
            Delete
          </Button>
          <ConfirmationPopper
            popperId={id}
            onPopperConfirm={handlePopperConfirm}
            onPopperCancel={handlePopperCancel}
            anchorEl={anchorEl}
          />
        </CardActions>
      )}
    </Card>
  );
};

VideoCard.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  tags: PropTypes.array,
  publishedAt: PropTypes.string,
  duration: PropTypes.number,
  id: PropTypes.string,
  onRemove: PropTypes.func,
  uploader: PropTypes.string,
  type: PropTypes.string,
};

VideoCard.defaultProps = {
  title: "",
  thumbnail: "",
  tags: [],
  publishedAt: "",
  duration: 0,
  id: "",
  onRemove: () => {},
  uploader: "",
  type: VIDEO_TYPE_STREAM,
};

export default VideoCard;
