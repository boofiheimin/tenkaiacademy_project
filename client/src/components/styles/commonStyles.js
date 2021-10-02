import { makeStyles } from "@material-ui/core";

const useCommonStyles = makeStyles((theme) => ({
  actionButton: {
    minWidth: "32px",
    padding: "8px",
    marginRight: theme.spacing(1),
  },
}));

export default useCommonStyles;
