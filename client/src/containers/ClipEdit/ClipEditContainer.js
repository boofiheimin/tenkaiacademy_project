import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { getClip, editClip, refetchClip } from "../../actions/ClipsActions";
import { getTags } from "../../actions/TagsActions";

import VideoEdit from "../../components/VideoEdit/VideoEdit";

import { youtubeThumbnailGetter } from "../../helper";

import { VIDEO_TYPE_CLIP } from "../../constants/main";

const ClipEditContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clip } = useSelector((state) => state.clips);
  const tags = useSelector((state) => state.tags);
  const [formData, setFormData] = useState({});
  const [tagOptions, setTagOptions] = useState([]);

  const { id: clipId } = useParams();

  useEffect(() => {
    dispatch(getClip(clipId));
    dispatch(getTags());
  }, [clipId]);

  const formDataInit = useCallback(() => {
    if (tags.length > 0 && clip) {
      const formatTags = clip.tags.map(({ tagId: tid }) => {
        const { _id, tagNameEN, tagId, catId } = tags.find(
          (tag) => tag.tagId === tid
        );
        return { id: _id, text: tagNameEN, tagId, catId };
      });
      const formatVideos = clip.relatedVideos.map(
        ({ videoId, title, thumbnail }) => ({
          id: videoId,
          text: title,
          img: thumbnail || youtubeThumbnailGetter(videoId),
        })
      );

      const formatSrcs = clip.srcVideos.map(
        ({ videoId, title, thumbnail }) => ({
          id: videoId,
          text: title,
          img: thumbnail || youtubeThumbnailGetter(videoId),
        })
      );

      setFormData({
        ...clip,
        tags: formatTags,
        relatedVideos: formatVideos,
        srcVideos: formatSrcs,
      });

      let formatOptions = [...tags];

      formatTags.forEach((ft) => {
        formatOptions = formatOptions.filter((tag) => tag._id !== ft.id);
      });

      setTagOptions(formatOptions);
    }
  }, [clip, tags]);

  useEffect(() => {
    formDataInit();
  }, [clip, tags]);

  const goBack = () => {
    navigate(`/clips/${clipId}`);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formatTags = formData.tags.map(({ tagId, text, tagNameJP }) => ({
      tagId,
      tagNameEN: text,
      tagNameJP,
    }));

    const formatVideos = formData.relatedVideos.map(({ id }) => ({
      videoId: id,
    }));

    const formatSrcs = formData.srcVideos.map(({ id }) => ({
      videoId: id,
    }));

    dispatch(
      editClip(clipId, {
        ...formData,
        tags: formatTags,
        relatedVideos: formatVideos,
        srcVideos: formatSrcs,
      })
    );
  };

  const onReset = () => {
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

  const onReorderTag = (reorderedTags) => {
    const newForm = {
      ...formData,
      tags: [...reorderedTags],
    };
    setFormData(newForm);
  };

  const onRemoveTag = (id) => {
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
      description: e.target.value,
    };
    setFormData(newForm);
  };

  const onAddVideo = (videoId) => {
    const newVideos = [
      ...formData.relatedVideos,
      {
        id: videoId,
        text: videoId,
        img: youtubeThumbnailGetter(videoId),
      },
    ];
    const newForm = {
      ...formData,
      relatedVideos: newVideos,
    };
    setFormData(newForm);
  };
  const onReorderVideo = (reorderedVideos) => {
    const newForm = {
      ...formData,
      relatedVideos: [...reorderedVideos],
    };
    setFormData(newForm);
  };
  const onRemoveVideo = (id) => {
    const newVideos = [...formData.relatedVideos];
    const newForm = {
      ...formData,
      relatedVideos: newVideos.filter((video) => video.id !== id),
    };
    setFormData(newForm);
  };

  const onAddSrc = (videoId) => {
    const newVideos = [
      ...formData.srcVideos,
      {
        id: videoId,
        text: videoId,
        img: youtubeThumbnailGetter(videoId),
      },
    ];
    const newForm = {
      ...formData,
      srcVideos: newVideos,
    };
    setFormData(newForm);
  };
  const onReorderSrc = (reorderedVideos) => {
    const newForm = {
      ...formData,
      srcVideos: [...reorderedVideos],
    };
    setFormData(newForm);
  };
  const onRemoveSrc = (id) => {
    const newVideos = [...formData.srcVideos];
    const newForm = {
      ...formData,
      srcVideos: newVideos.filter((video) => video.id !== id),
    };
    setFormData(newForm);
  };

  const refetchVideo = () => {
    dispatch(refetchClip(clipId));
  };

  const onTitleChange = (e) => {
    const newForm = {
      ...formData,
      title: e.target.value,
    };
    setFormData(newForm);
  };
  const onThumbnailChange = (e) => {
    const newForm = {
      ...formData,
      thumbnail: e.target.value,
    };
    setFormData(newForm);
  };
  const onDurationChange = (e) => {
    const newForm = {
      ...formData,
      duration: e.target.value,
    };
    setFormData(newForm);
  };
  const onUploaderChange = (e) => {
    const newForm = {
      ...formData,
      uploader: e.target.value,
    };
    setFormData(newForm);
  };
  const onPublishedChange = (v) => {
    const newForm = {
      ...formData,
      publishedAt: v.toISOString(),
    };
    setFormData(newForm);
  };

  return (
    <VideoEdit
      type={VIDEO_TYPE_CLIP}
      formData={formData}
      goBack={goBack}
      onSubmit={onSubmit}
      onReset={onReset}
      tags={tagOptions}
      onAddTag={onAddTag}
      onRemoveTag={onRemoveTag}
      onReorderTag={onReorderTag}
      onDetailChange={onDetailChange}
      onAddVideo={onAddVideo}
      onReorderVideo={onReorderVideo}
      onRemoveVideo={onRemoveVideo}
      onAddSrc={onAddSrc}
      onReorderSrc={onReorderSrc}
      onRemoveSrc={onRemoveSrc}
      refetchVideo={refetchVideo}
      onTitleChange={onTitleChange}
      onThumbnailChange={onThumbnailChange}
      onDurationChange={onDurationChange}
      onUploaderChange={onUploaderChange}
      onPublishedChange={onPublishedChange}
    />
  );
};

export default ClipEditContainer;
