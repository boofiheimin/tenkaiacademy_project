import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: { width: "100%" },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  textarea: {
    resize: "none",
    width: "100%",
    fontFamily: "Rubik",
    fontSize: "1rem",
    padding: "6px",
  },
  addButton: {
    minWidth: "auto",
    padding: "0",
    marginTop: "6px",
  },
  tableContainer: {},
  tableCell: {
    padding: theme.spacing(1),
  },
}));

export default useStyles;
