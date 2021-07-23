import HorizontalVideoCard from "./HorizontalVideoCard";

import { GAME, TALK, PRIVATE } from "../constants/videoTypes";

export default {
  title: "HorizontalVideoCard",
  component: HorizontalVideoCard,
  argTypes: {
    title: {
      defaultValue:
        "【Minecraft】「××時間かかった奇跡の結晶！！」で売りに出す！！！【天音かなた/ホロライブ】",
      control: { type: "text" },
    },
    videoId: {
      defaultValue: "hIG5Dhlke7I",
      control: { type: "text" },
    },
    uploader: {
      defaultValue: "Kanata Ch. Kanata Amane",
      control: { type: "text" },
    },
  },
};

const Template = (args) => <HorizontalVideoCard {...args} />;

export const Primary = Template.bind({});
