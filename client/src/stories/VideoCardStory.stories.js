import VideoCardStory from "./VideoCardStory";

import {
  GAME,
  TALK,
  COVER,
  SINGING,
  LIVE,
  ORIGINAL,
  PRIVATE,
} from "../constants/videoTypes";

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
      options: [GAME, TALK, COVER, SINGING, LIVE, ORIGINAL, PRIVATE, "misc"],
      control: { type: "select" },
    },
    tags: {
      defaultValue: [
        { id: 1, name: "Game" },
        { id: 2, name: "Minecraft" },
        { id: 3, name: "Endurance" },
      ],
    },
    duration: {
      defaultValue: 5400,
      control: { type: "number" },
    },
  },
};

const Template = (args) => <VideoCardStory {...args} />;

export const Primary = Template.bind({});
