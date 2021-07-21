import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  publishedAtBox: {
    fontStyle: "italic",
    fontSize: "0.75rem",
    paddingBottom: theme.spacing(1),
  },
  header: {
    color: "white",
    background: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
    padding: theme.spacing(1),
  },
  buttonLink: {
    background: "none !important",
    border: "none",
    padding: "0 !important",
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

export default useStyles;
