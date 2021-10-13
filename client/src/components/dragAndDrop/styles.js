import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    width: "min(400px, 100%)",
  },
  droppableContainer: ({ itemsLength }) => ({
    marginTop: itemsLength ? theme.spacing(1) : 0,
  }),
}));

export default useStyles;
