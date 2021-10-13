import PropTypes from "prop-types";
import {
  Popper,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const ConfirmationPopper = ({
  popperId,
  anchorEl,
  onPopperConfirm,
  onPopperCancel,
}) => (
  <Popper id={popperId} open={Boolean(anchorEl)} anchorEl={anchorEl}>
    <Card>
      <CardContent>
        <Typography>Are you sure?</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="secondary"
          variant="outlined"
          onClick={onPopperConfirm}
        >
          confirm
        </Button>
        <Button
          size="small"
          color="primary"
          variant="outlined"
          onClick={onPopperCancel}
        >
          cancel
        </Button>
      </CardActions>
    </Card>
  </Popper>
);

ConfirmationPopper.propTypes = {
  popperId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  anchorEl: PropTypes.instanceOf(HTMLButtonElement),
  onPopperConfirm: PropTypes.func,
  onPopperCancel: PropTypes.func,
};

ConfirmationPopper.defaultProps = {
  popperId: "",
  anchorEl: null,
  onPopperConfirm: () => {},
  onPopperCancel: () => {},
};
export default ConfirmationPopper;
