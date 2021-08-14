import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: ({ bgColor }) => ({
    maxWidth: 120,
    ...(bgColor && {
      backgroundColor: bgColor,
      color: "white",
      fontWeight: "bold",
    }),
  }),
}));

export default useStyles;
