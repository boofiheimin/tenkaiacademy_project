import { useState } from "react";
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

const Tags = ({ tags, onTagSave, onTagRemove, onAddTag }) => {
  const classes = useStyles();
  const [tagNameEN, setEN] = useState("");
  const [tagNameJP, setJP] = useState("");
  const [catId, setCatId] = useState("");

  const [enError, setENError] = useState(false);
  const [catError, setCatError] = useState(false);

  const handleENChange = (e) => {
    setEN(e.target.value);
  };
  const handleJPChange = (e) => {
    setJP(e.target.value);
  };
  const handleCatIdChange = (e) => {
    setCatId(e.target.value);
  };

  const handleAddTag = () => {
    if (tagNameEN === "" || catId === "") {
      setENError(tagNameEN === "");
      setCatError(catId === "");
    } else {
      onAddTag({
        tagNameEN,
        tagNameJP,
        catId,
      });
      setEN("");
      setJP("");
      setCatId("");
      setENError(false);
      setCatError(false);
    }
  };

  tags.sort((a, b) => a.catId - b.catId || a.tagId - b.tagId);

  return (
    <Container>
      <div className={classes.header}>
        <Typography variant="h5">Tags</Typography>
      </div>
      <Divider />
      <div className={classes.input}>
        <TextField
          label="Tag name EN"
          value={tagNameEN}
          error={enError}
          helperText={enError ? "Please provide tag name" : null}
          onChange={handleENChange}
        />
        <TextField
          label="Tag name JP"
          value={tagNameJP}
          onChange={handleJPChange}
        />
        <TextField
          label="categoryId"
          value={catId}
          error={catError}
          helperText={catError ? "Please provide category id" : null}
          onChange={handleCatIdChange}
        />
        <Button variant="contained" onClick={handleAddTag}>
          Add Tag
        </Button>
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
      tagId: PropTypes.number,
      tagNameEN: PropTypes.string,
      tagNameJP: PropTypes.string,
      catId: PropTypes.number,
    })
  ),
  onTagSave: PropTypes.func,
  onTagRemove: PropTypes.func,
  onAddTag: PropTypes.func,
};
Tags.defaultProps = {
  tags: [],
  onTagSave: () => {},
  onTagRemove: () => {},
  onAddTag: () => {},
};

export default Tags;
