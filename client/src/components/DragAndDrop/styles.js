import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "silver",
    padding: theme.spacing(1),
    width: 400,
  },
  droppableContainer: ({ itemsLength }) => ({
    marginTop: itemsLength ? theme.spacing(1) : 0,
  }),
}));

export default useStyles;
