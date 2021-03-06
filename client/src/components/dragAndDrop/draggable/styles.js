import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  listContainer: ({ isDragging, draggableStyle, active }) => ({
    display: "flex",
    alignItems: "center",
    border: "1px solid silver",
    padding: theme.spacing(1),
    backgroundColor:
      isDragging || active ? theme.palette.action.selected : "transparent",
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
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  actionButton: {
    minWidth: "1em",
    marginRight: theme.spacing(1),
  },
  clickable: {
    cursor: "pointer",
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  },
}));

export default useStyles;
