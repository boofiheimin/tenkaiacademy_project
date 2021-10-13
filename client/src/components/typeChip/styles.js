import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(() => ({
  root: ({ bgColor, isCard }) => ({
    ...(isCard && { maxWidth: 120 }),
    ...(bgColor && {
      backgroundColor: bgColor,
      color: "white",
      fontWeight: "bold",
    }),
  }),
}));

export default useStyles;
