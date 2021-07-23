import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 400,
    "&:not(:last-child)": {
      marginBottom: theme.spacing(1),
    },
  },
  actionArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(1),
  },
  thumbnail: {
    width: 168,
    height: 94,
    flexShrink: 0,
    objectFit: "cover",
  },
  info: {
    height: 94,
    paddingLeft: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  videoTitle: {
    height: 48,
    lineClamp: "2",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
  },
  uploader: {
    fontSize: "0.85rem",
    fontStyle: "italic",
    marginTop: theme.spacing(1),
  },
}));

export default useStyles;
