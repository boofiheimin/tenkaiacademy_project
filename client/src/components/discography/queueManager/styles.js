import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  controller: {
    height: "100px",
  },
  actionButton: {
    minWidth: "1em",
    padding: 1,
    marginRight: theme.spacing(1),
    "&_active": {
      color: "#4caf50",
      minWidth: "1em",
      padding: 1,
      marginRight: theme.spacing(1),
    },
  },
  timestampContainer: {
    height: "calc(100% - 100px)",
    width: "100%",
    overflow: "auto",
    position: "relative",
  },
  timestampScroller: {
    padding: theme.spacing(1),
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    [theme.breakpoints.down("xl")]: {
      minWidth: 300,
      overflowX: "auto",
    },
  },
}));

export default useStyles;
