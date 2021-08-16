import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    padding: theme.spacing(1),
  },
  textarea: {
    resize: "none",
    width: "100%",
    fontFamily: "Rubik",
    fontSize: "1rem",
    padding: "6px",
  },
  actionButtonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  actionButton: {
    minWidth: "32px",
    padding: "8px",
  },
}));

export default useStyles;
