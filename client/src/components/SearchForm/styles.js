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
    flexWrap: "wrap",
  },
  searchTitle: {
    width: 400,
    margin: theme.spacing(1),
  },
  btnGroups: {
    height: theme.spacing(9),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: 400,
    },
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
  moreField: { width: 300, margin: theme.spacing(1) },
  accdContainer: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      "&:not(:last-child)": {
        // marginRight: theme.spacing(1),
      },
    },
  },
}));

export default useStyles;
