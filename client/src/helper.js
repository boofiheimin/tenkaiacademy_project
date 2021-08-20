export const tagSortHelper = (tags) =>
  tags.sort(
    (a, b) => a.catId.localeCompare(b.catId) || a.tagId.localeCompare(b.tagId)
  );

export const hhmmssRegEx =
  /^(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)$/g;

export const secondsTohhmmss = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);

export const youtubeThumbnailGetter = (videoId) =>
  `https://i.ytimg.com/vi/${videoId}/0.jpg`;
