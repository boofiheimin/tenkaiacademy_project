import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textAreaContainer: {
    padding: theme.spacing(2),
  },
  textarea: {
    width: "100%",
    resize: "none",
    fontFamily: "Rubik",
    fontSize: "1rem",
    padding: "6px",
  },
  importTSModal: {},
}));

export default useStyles;
