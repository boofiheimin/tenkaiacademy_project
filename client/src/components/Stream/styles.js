import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    [theme.breakpoints.down("lg")]: {
      padding: 0,
    },
  },
  sectionHeader: {
    padding: `${theme.spacing(1)}px  ${theme.spacing(2)}px`,
    // background: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
    // color: "white",
  },
  videoTitle: {
    padding: theme.spacing(2),
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
    height: "calc(100% - 56px)",
    width: "100%",
    marginTop: theme.spacing(0.5),
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
    [theme.breakpoints.down("lg")]: {
      minWidth: 300,
      overflowX: "auto",
    },
  },
  publishedAt: {
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    fontStyle: "italic",
  },
  secondGrid: {
    marginTop: theme.spacing(1),
  },
  thirdGrid: {
    marginTop: theme.spacing(1),
  },
  embedContainer: {
    "& div": {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      alignItems: "center",
    },
    "& iframe": {
      width: "100% !important",
    },
  },
  relatedVidContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
  },
  mobBtn: {
    width: 120,
    "&:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
  descDialog: {
    position: "fixed",
    top: `calc(56px + 100vw * 9 / 16)`,
    zIndex: 5555,
    height: `calc(100vh - 56px - 100vw * 9 / 16)`,
    width: "100vw",
    backgroundColor: "white",
  },
  dialogHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  dialogHeader_text: {
    flexGrow: 1,
  },
  accordionDesc: {
    width: "100%",
  },
}));

export default useStyles;
