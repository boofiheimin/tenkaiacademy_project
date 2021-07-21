import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    paddingTop: "56.25%",
    "& iframe": {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: "100%",
      height: "100%",
      border: "none",
    },
  },
}));

export default useStyles;
