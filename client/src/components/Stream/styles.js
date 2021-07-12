import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  tabs: {
    background: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
  },
  indicator: {
    backgroundColor: "white",
  },
  selected: {
    color: "white !important",
  },
  selected2: {
    color: "white !important",
  },
  tab: {
    textTransform: "none",
  },
  card: {
    height: "100%",
  },
  tagHeader: {
    background: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
    padding: theme.spacing(1),
    color: "white",
  },
  videoTitle: {
    lineClamp: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
    flexGrow: 1,
  },
  editButton: {
    minWidth: "auto",
    padding: "8px",
    color: "white",
    background: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
  },
}));

export default useStyles;
