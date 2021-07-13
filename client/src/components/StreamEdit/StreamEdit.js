import Proptypes from "prop-types";

import { Container, Box, Typography, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const StreamEdit = ({ stream, goBack }) => {
  const { title } = stream;
  return (
    <Container>
      <Box display="flex" flexDirection="column" height="100%">
        <Box display="flex" alignItems="center">
          <IconButton onClick={goBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">Edit Form</Typography>
        </Box>
        <Box>Video info</Box>
        <Box>Tag management</Box>
        <Box>Add related video</Box>
        <Box>Add related tweet</Box>
        <Box>Add detailed</Box>
        <Box>Add timestamp</Box>
        <Box>Add clip</Box>
      </Box>
    </Container>
  );
};

StreamEdit.propTypes = {
  stream: Proptypes.object,
  goBack: Proptypes.func.isRequired,
};

StreamEdit.defaultProps = {
  stream: {},
};

export default StreamEdit;
