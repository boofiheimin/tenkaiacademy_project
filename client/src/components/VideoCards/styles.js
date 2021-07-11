import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    position: "relative",
  },

  videoTitle: {
    height: 48,
    lineClamp: "2",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
  },
  cardActions: {
    padding: theme.spacing(2),
  },
  historyIcon: {
    marginRight: theme.spacing(1),
  },
  content: {
    height: 110,
  },
  cardMedia: {
    position: "relative",
  },
}));

export default useStyles;
