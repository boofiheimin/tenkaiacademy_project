import PropTypes from "prop-types";
import VideoCardStory from "./videoCardStory";

import { GAME, TALK, PRIVATE } from "../constants/videoTypes";

export default {
  title: "VideoCard",
  component: VideoCardStory,
  argTypes: {
    title: {
      defaultValue:
        "【Minecraft】「××時間かかった奇跡の結晶！！」で売りに出す！！！【天音かなた/ホロライブ】",
      control: { type: "text" },
    },
    thumbnail: {
      defaultValue: "https://i.ytimg.com/vi/hIG5Dhlke7I/hqdefault.jpg",
      control: { type: "text" },
    },
    type: {
      defaultValue: GAME,
      options: [GAME, TALK, PRIVATE, "misc"],
      control: { type: "select" },
    },
    tags: {
      defaultValue: [
        { id: 1, tagNameEN: "Game" },
        { id: 2, tagNameEN: "Minecraft" },
      ],
    },
    duration: {
      defaultValue: 5400,
      control: { type: "number" },
    },
  },
};

const Template = (props) => {
  // eslint-disable-next-line no-param-reassign
  const { tags, type, ...restargs } = props;
  tags[0] = { id: 1, tagNameEN: type };

  return <VideoCardStory tags={tags} {...restargs} />;
};

Template.propTypes = {
  tags: PropTypes.array,
  type: PropTypes.string,
};

Template.defaultProps = {
  tags: [],
  type: "GAME",
};

export const Primary = Template.bind({});
