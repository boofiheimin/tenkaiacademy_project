import makeStyles from "@mui/styles/makeStyles";
import background from "../../assets/images/4.webp";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  background: {
    width: "100vw",
    height: "100vh",
    paddingTop: theme.spacing(8),
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
  },
}));

export default useStyles;
