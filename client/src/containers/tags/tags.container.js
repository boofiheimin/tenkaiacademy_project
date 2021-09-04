import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getTags,
  createTag,
  deleteTag,
  editTag,
} from "../../actions/tags.actions";

import Tags from "../../components/tags/tags";

const TagsContainer = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags);

  useEffect(() => {
    dispatch(getTags(true));
  }, [dispatch]);

  const onAddTag = (tag) => {
    dispatch(createTag(tag));
  };
  const onRemoveTag = (id) => {
    dispatch(deleteTag(id));
  };

  const onTagSave = (id, tag) => {
    dispatch(editTag(id, tag));
  };

  return (
    <Tags
      tags={tags}
      onAddTag={onAddTag}
      onRemoveTag={onRemoveTag}
      onTagSave={onTagSave}
    />
  );
};

export default TagsContainer;
