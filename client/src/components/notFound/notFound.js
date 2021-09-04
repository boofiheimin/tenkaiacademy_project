import { Box, CssBaseline, Typography } from "@material-ui/core";
import ppbored from "../../assets/images/ppbored.png";

const NotFound = () => (
  <>
    <CssBaseline />
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
    >
      <img src={ppbored} alt="ppbored" />
      <Typography>404 There is nothing here !</Typography>
    </Box>
  </>
);

export default NotFound;
