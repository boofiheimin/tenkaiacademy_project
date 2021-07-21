import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";

import { getStream, editStream } from "../../actions/StreamsActions";
import { getTags } from "../../actions/TagsActions";

import StreamEdit from "../../components/StreamEdit/StreamEdit";

const StreamEditContainer = ({ streamId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { stream } = useSelector((state) => state.streams);
  const tags = useSelector((state) => state.tags);

  const [formData, setFormData] = useState({});
  const [tagOptions, setTagOptions] = useState([]);

  const formDataInit = useCallback(() => {
    console.log("formDataInit");
    if (tags.length > 0 && stream) {
      console.log("formDataInit start");
      const formatTags = stream.tags.map(({ tagId: tid }) => {
        const { _id, tagNameEN, tagId, catId } = tags.find(
          (tag) => tag.tagId === tid
        );
        return { id: _id, text: tagNameEN, tagId, catId };
      });

      setFormData({
        ...stream,
        tags: formatTags,
      });

      let formatOptions = [...tags];

      formatTags.forEach((ft) => {
        formatOptions = formatOptions.filter((tag) => tag._id !== ft.id);
      });

      setTagOptions(formatOptions);
    }
  }, [stream, tags]);

  useEffect(() => {
    formDataInit();
  }, [formDataInit]);

  const goBack = () => {
    navigate(`/streams/${streamId}`);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editStream(streamId, {
        ...formData,
        tags: formData.tags.map(({ tagId, text, tagNameJP }) => ({
          tagId,
          tagNameEN: text,
          tagNameJP,
        })),
      })
    );
  };

  const onReset = () => {
    console.log("what");
    formDataInit();
  };

  const onAddTag = ({ _id, tagId, tagNameEN, tagNameJP, catId }) => {
    let newTags = [...formData.tags];
    let newOptions = tagOptions.filter((tag) => tag._id !== _id);
    // Add parent Tag if no parent tag is found
    if (catId > 0) {
      const parentTag = formData.tags.find((tag) => tag.tagId === catId);
      if (!parentTag) {
        const {
          _id: pId,
          tagNameEN: pEN,
          tagNameJP: pJP,
          tagId: pTId,
          catId: pCatId,
        } = tags.find((tag) => tag.tagId === catId);
        newTags = [
          ...newTags,
          { id: pId, text: pEN, tagNameJP: pJP, tagId: pTId, catId: pCatId },
        ];
        newOptions = newOptions.filter((tag) => tag._id !== pId);
      }
    }
    newTags = [
      ...newTags,
      { id: _id, text: tagNameEN, tagNameJP, tagId, catId },
    ];
    const newForm = {
      ...formData,
      tags: newTags,
    };
    setFormData(newForm);
    setTagOptions(newOptions);
  };

  const onTagReordered = (reorderedTags) => {
    const newForm = {
      ...formData,
      tags: [...reorderedTags],
    };
    setFormData(newForm);
  };

  const onTagRemove = (id) => {
    // If parent tag is removed. Remove all child.
    let newTags = [...formData.tags];
    let newOptions = [...tagOptions];

    const deletedTag = tags.find((tag) => tag._id === id);
    if (deletedTag.catId === 0) {
      const childTags = formData.tags.filter(
        (tag) => tag.catId === deletedTag.tagId
      );
      childTags.forEach((childTag) => {
        newTags = newTags.filter((tag) => tag.id !== childTag.id);
        newOptions = [
          ...newOptions,
          tags.find((tag) => tag._id === childTag.id),
        ];
      });
    }
    const newForm = {
      ...formData,
      tags: newTags.filter((tag) => tag.id !== id),
    };
    newOptions = [...newOptions, tags.find((tag) => tag._id === id)];
    newOptions.sort((a, b) => a.catId - b.catId || a.tagId - b.tagId);
    setFormData(newForm);
    setTagOptions(newOptions);
  };

  const onDetailChange = (e) => {
    const newForm = {
      ...formData,
      detail: e.target.value,
    };
    setFormData(newForm);
  };

  const onAddTimeStamp = ({ timestamp, description }) => {
    const newTimestamps = [
      ...formData.timestamps,
      {
        timestamp: moment.duration(timestamp).asSeconds(),
        description,
      },
    ];
    newTimestamps.sort((a, b) => a.timestamp - b.timestamp);
    const newForm = {
      ...formData,
      timestamps: newTimestamps,
    };

    setFormData(newForm);
  };

  const onDeleteTimestamp = (index) => {
    const newTimestamps = [...formData.timestamps];
    newTimestamps.splice(index, 1);
    const newForm = {
      ...formData,
      timestamps: newTimestamps,
    };
    setFormData(newForm);
  };

  const onTimestampSave = ({ timestamp, description }, index) => {
    const newTimestamps = [...formData.timestamps];
    newTimestamps.splice(index, 1, {
      timestamp: moment.duration(timestamp).asSeconds(),
      description,
    });
    newTimestamps.sort((a, b) => a.timestamp - b.timestamp);
    const newForm = {
      ...formData,
      timestamps: newTimestamps,
    };

    setFormData(newForm);
  };

  return (
    <StreamEdit
      formData={formData}
      goBack={goBack}
      onSubmit={onSubmit}
      onReset={onReset}
      tags={tagOptions}
      onAddTag={onAddTag}
      onTagRemove={onTagRemove}
      onTagReordered={onTagReordered}
      onDetailChange={onDetailChange}
      onAddTimeStamp={onAddTimeStamp}
      onDeleteTimestamp={onDeleteTimestamp}
      onTimestampSave={onTimestampSave}
    />
  );
};

StreamEditContainer.propTypes = {
  streamId: PropTypes.string.isRequired,
};

const StreamEditWrapper = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getStream(id));
    dispatch(getTags());
  }, [dispatch, id]);

  return <StreamEditContainer streamId={id} />;
};

export default StreamEditWrapper;
