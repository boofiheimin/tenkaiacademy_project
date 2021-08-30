import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  ratioContainer: {
    width: "100%",
    paddingTop: "56.25%",
    position: "relative",
  },
  ratioObject: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  searchBox: {
    width: "100%",
  },
  sectionHeader: {
    height: 64,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  timestampContainer: {
    height: "calc(100% - 64px)",
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
    [theme.breakpoints.down("lg")]: {
      minWidth: 300,
      overflowX: "auto",
    },
  },
  actionButton: {
    minWidth: "1em",
    padding: 0,
    marginRight: theme.spacing(1),
  },
  tablePagination: {
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-end",
    "& > :not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
}));

export default useStyles;
