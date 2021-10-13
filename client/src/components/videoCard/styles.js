import makeStyles from "@mui/styles/makeStyles";

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
    height: 130,
  },
  cardMedia: {
    position: "relative",
  },
  authorChip: {
    marginLeft: theme.spacing(1),
  },
  invisiblechip: {
    background: "none",
  },
  uploader: {
    fontSize: "0.85rem",
    fontStyle: "italic",
    marginTop: theme.spacing(1),
    color: "darkgray",
  },
  actionbtn: {
    width: 80,
  },
}));

export default useStyles;
