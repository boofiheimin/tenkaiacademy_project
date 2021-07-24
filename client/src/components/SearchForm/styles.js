import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  basicSearch: {
    padding: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  searchTitle: {
    width: 400,
    marginRight: theme.spacing(2),
  },
  btnGroups: {
    height: theme.spacing(7),
    display: "flex",
    alignItems: "center",
  },
  clrBtn: {
    marginLeft: theme.spacing(1),
    minWidth: "auto",
    padding: "6px",
  },
  buttonLink: {
    background: "none !important",
    border: "none",
    padding: "0 !important",
    textDecoration: "underline",
    cursor: "pointer",
  },
  advSearch: {
    maxHeight: 0,
    overflow: "hidden",
    transition: "max-height 0.2s ease-out",
  },
  advSearchClose: {},
  accdContainer: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      "&:not(:last-child)": {
        marginRight: theme.spacing(1),
      },
    },
  },
}));

export default useStyles;
