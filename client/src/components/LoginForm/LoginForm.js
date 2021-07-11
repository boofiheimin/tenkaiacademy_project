import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  Paper,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";

import useStyles from "./styles";

const LoginForm = ({ onFormChange, onFormSubmit }) => {
  const classes = useStyles();
  return (
    <div className={classes.background}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in to CMS
          </Typography>
          <form className={classes.form} onSubmit={onFormSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={onFormChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onFormChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginForm;