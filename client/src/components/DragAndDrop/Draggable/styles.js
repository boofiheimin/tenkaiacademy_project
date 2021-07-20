import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listContainer: ({ isDragging, draggableStyle }) => ({
    display: "flex",
    alignItems: "center",
    border: "1px solid silver",
    padding: theme.spacing(1),
    backgroundColor: isDragging ? "lightblue" : "white",
    userSelect: "none",
    position: "relative",
    ...draggableStyle,
  }),
  icon: { marginRight: theme.spacing(1) },
  img: {
    width: 160,
    objectFit: "cover",
    height: 90,
    marginRight: theme.spacing(1),
    flexShrink: 0,
  },
  cancel: {},
  text: {
    flexGrow: 1,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
}));

export default useStyles;