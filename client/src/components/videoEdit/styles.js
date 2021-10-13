import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  segmentContainer: {
    minHeight: 270,
    width: "100%",
    margin: theme.spacing(2),
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
  },
  thumbnail: {
    objectFit: "cover",
    height: 270,
    width: 480,
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    "& > :not(:first-child)": {
      marginLeft: theme.spacing(1),
    },
  },
  vidInfo: {
    flexGrow: 1,
  },
  refetchButton: {
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    color: "white",
    background: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
  },
  refetchIcon: {
    marginRight: theme.spacing(1),
    fontSize: "16px",
  },
  formController: {
    display: "flex",
    padding: theme.spacing(2),
  },
  formControlButton: {
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    color: "white",
    width: 80,
  },
  saveButton: {
    backgroundColor: theme.palette.success.main,
    marginRight: theme.spacing(1),
  },
  resetButton: {
    backgroundColor: theme.palette.error.light,
  },
  textAreaContainer: {
    padding: theme.spacing(2),
  },
  textarea: {
    width: "100%",
    resize: "none",
    fontFamily: "Rubik",
    fontSize: "1rem",
    padding: "6px",
  },
  dndContainer: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  infoInputContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  infoInput: {
    width: "100%",
  },
  timestampHeader: {
    flexGrow: 1,
  },
}));

export default useStyles;
