import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  sectionHeader: {
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
  chip: {
    marginBottom: theme.spacing(1),
    "&:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
  buttonLink: {
    background: "none !important",
    border: "none",
    padding: "0 !important",
    textDecoration: "underline",
    cursor: "pointer",
  },
  timestampContainer: {
    height: "calc(100% - 48px)",
    width: "100%",
    overflowY: "auto",
    position: "relative",
  },
  timestampScroller: {
    padding: theme.spacing(1),
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
}));

export default useStyles;
