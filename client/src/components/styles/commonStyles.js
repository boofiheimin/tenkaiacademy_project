import makeStyles from "@mui/styles/makeStyles";

const useCommonStyles = makeStyles((theme) => ({
  actionButton: {
    minWidth: "32px",
    padding: "8px",
    marginRight: theme.spacing(1),
  },
}));

export default useCommonStyles;
