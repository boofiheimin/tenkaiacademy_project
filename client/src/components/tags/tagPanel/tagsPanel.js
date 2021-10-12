import PropTypes from "prop-types";

import { tagSortHelper } from "../../../helper";

import CommonTable from "../../commonTable/commonTable";

const Tags = ({ tags, onTagSave, onRemoveTag, onAddTag, isClip }) => {
  tagSortHelper(tags);
  return (
    <CommonTable
      columnOptions={[
        {
          name: "id",
          width: "10%",
          value: "tagId",
        },
        {
          name: "Tag name EN",
          width: "30%",
          filter: true,
          value: "tagNameEN",
          input: true,
          required: true,
        },
        {
          name: "Tag name JP",
          width: "30%",
          filter: true,
          value: "tagNameJP",
          input: true,
        },
        {
          name: "Category Id",
          width: "10%",
          filter: true,
          value: "catId",
          input: true,
          required: true,
        },
        { name: "Action", width: "20%" },
      ]}
      data={tags}
      onRowSave={onTagSave}
      onRowRemove={onRemoveTag}
      onRowAdd={(tag) => onAddTag({ ...tag, isClip })}
      defaultRowsPerPage={50}
    />
  );
};

Tags.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      tagId: PropTypes.string,
      tagNameEN: PropTypes.string,
      tagNameJP: PropTypes.string,
      catId: PropTypes.string,
    })
  ),
  onTagSave: PropTypes.func,
  onRemoveTag: PropTypes.func,
  onAddTag: PropTypes.func,
  isClip: PropTypes.bool,
};
Tags.defaultProps = {
  tags: [],
  onTagSave: () => {},
  onRemoveTag: () => {},
  onAddTag: () => {},
  isClip: false,
};

export default Tags;
