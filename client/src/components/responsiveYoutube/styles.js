import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(() => ({
  container: ({ showPlaceholder }) => ({
    position: "relative",
    height: 0,
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
      display: showPlaceholder ? "none" : "block",
    },
    "& img": {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: "100%",
      height: "100%",
      border: "none",
      display: showPlaceholder ? "block" : "none",
    },
  }),
}));

export default useStyles;
