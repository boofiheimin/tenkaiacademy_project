import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listContainer: ({ isDragging, draggableStyle }) => ({
    display: "flex",
    alignItems: "center",
    border: "1px solid silver",
    padding: theme.spacing(1),
    backgroundColor: isDragging ? "lightblue" : "white",
    userSelect: "none",
    ...draggableStyle,
  }),
  icon: { marginRight: theme.spacing(1) },
  img: {
    width: 160,
    objectFit: "cover",
    height: 90,
    marginRight: theme.spacing(1),
  },
}));

export default useStyles;
