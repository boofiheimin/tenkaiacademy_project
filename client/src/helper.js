export const tagSortHelper = (tags) =>
  tags.sort(
    (a, b) =>
      parseInt(a.catId.replace(/C/, ""), 10) -
        parseInt(b.catId.replace(/C/, ""), 10) ||
      parseInt(a.tagId.replace(/C/, ""), 10) -
        parseInt(b.tagId.replace(/C/, ""), 10)
  );

export const hhmmssRegEx =
  /^(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)$/g;

export const secondsTohhmmss = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);

export const youtubeThumbnailGetter = (videoId) =>
  `https://i.ytimg.com/vi/${videoId}/0.jpg`;

export const extractValueFromPath = (value, path = "") => {
  const paths = path.split(".");
  const curPath = paths.shift();
  if (paths.length === 0) {
    return value[curPath];
  }
  return extractValueFromPath(value[curPath], paths.join("."));
};
