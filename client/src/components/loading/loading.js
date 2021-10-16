import { Box } from "@mui/material";
import ShurikenSpinner from "../shurikenSpinner/shurikenSpinner";

const Loading = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      margin: 0,
      padding: 0,
    }}
  >
    <ShurikenSpinner />
  </Box>
);

export default Loading;
