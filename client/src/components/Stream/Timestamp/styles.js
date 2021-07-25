import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  buttonLink: {
    background: "none !important",
    border: "none",
    padding: "0 !important",
    textDecoration: "underline",
    cursor: "pointer",
    color: theme.palette.text.primary,
  },
}));

export default useStyles;
