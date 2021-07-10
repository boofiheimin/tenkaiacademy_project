import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    height: 350,
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
}));

export default useStyles;
