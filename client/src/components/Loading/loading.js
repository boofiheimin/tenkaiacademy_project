import { Box } from "@material-ui/core";
import ShurikenSpinner from "../ShurikenSpinner/shurikenSpinner";

const Loading = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    width="100%"
    height="100%"
  >
    <ShurikenSpinner />
  </Box>
);

export default Loading;
