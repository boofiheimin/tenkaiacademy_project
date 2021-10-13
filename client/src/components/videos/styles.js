import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    color: "white",
    background: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
  },
  add: {
    marginRight: theme.spacing(1),
  },
  refetchIcon: {
    marginRight: theme.spacing(1),
    fontSize: "16px",
  },
}));

export default useStyles;
