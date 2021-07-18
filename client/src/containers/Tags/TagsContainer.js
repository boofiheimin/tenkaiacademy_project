import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getTags,
  createTag,
  deleteTag,
  editTag,
} from "../../actions/TagsActions";

import Tags from "../../components/Tags/Tags";

const TagsContainer = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags);

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  const onAddTag = (tag) => {
    dispatch(createTag(tag));
  };
  const onTagRemove = (id) => {
    dispatch(deleteTag(id));
  };

  const onTagSave = (id, tag) => {
    dispatch(editTag(id, tag));
  };

  return (
    <Tags
      tags={tags}
      onAddTag={onAddTag}
      onTagRemove={onTagRemove}
      onTagSave={onTagSave}
    />
  );
};

export default TagsContainer;
