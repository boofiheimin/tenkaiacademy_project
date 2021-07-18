import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(2),
  },
  input: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tagTable: {
    padding: theme.spacing(2),
  },
  table: {
    minWidth: 650,
    overflowX: "auto",
  },
}));

export default useStyles;
