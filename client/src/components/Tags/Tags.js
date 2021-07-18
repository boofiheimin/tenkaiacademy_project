import PropTypes from "prop-types";
import {
  Container,
  Typography,
  Divider,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import Tag from "./Tag/Tag";

import useStyles from "./styles";

const Tags = ({ tags = [], onTagSave, onTagRemove }) => {
  const classes = useStyles();
  return (
    <Container>
      <div className={classes.header}>
        <Typography variant="h5">Tags</Typography>
      </div>
      <Divider />
      <div className={classes.input}>
        <TextField label="Tag name EN" />
        <TextField label="Tag name JP" />
        <TextField label="categoryId" />
        <Button variant="contained">Add Tag</Button>
      </div>
      <Divider />
      <div className={classes.tagTable}>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "10%" }}>id</TableCell>
                <TableCell style={{ width: "30%" }}>EN</TableCell>
                <TableCell style={{ width: "30%" }}>JP</TableCell>
                <TableCell style={{ width: "10%" }}>Category ID</TableCell>
                <TableCell style={{ width: "20%" }} align="right">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tags.map((tag) => (
                <Tag tag={tag} onSave={onTagSave} onRemove={onTagRemove} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
};

Tags.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.objectOf({
      id: PropTypes.string,
      tagNameEN: PropTypes.string,
      tagNameJP: PropTypes.string,
      catId: PropTypes.string,
    })
  ),
  onTagSave: PropTypes.func,
  onTagRemove: PropTypes.func,
};
Tags.defaultProps = {
  tags: [],
  onTagSave: () => {},
  onTagRemove: () => {},
};

export default Tags;
