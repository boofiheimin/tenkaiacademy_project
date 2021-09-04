import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  "@keyframes loading": {
    from: {
      transform: "rotate(0turn)",
    },
    to: {
      transform: "rotate(1turn)",
    },
  },
  spinner: {
    animation: "$loading 1s ease infinite",
    width: 64,
    margin: 0,
    padding: 0,
    height: "auto",
  },
}));

export default useStyles;
