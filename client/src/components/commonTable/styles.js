import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > input": {
      width: "100%",
    },
  },
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
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: theme.spacing(1),
    "& > :not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
}));

export default useStyles;
