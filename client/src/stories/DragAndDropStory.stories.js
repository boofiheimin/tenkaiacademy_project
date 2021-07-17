import DragAndDropStory from "./DragAndDropStory";

export default {
  title: "DragAndDrop",
  component: DragAndDropStory,
  argTypes: {
    title: {
      defaultValue:
        "【Minecraft】「××時間かかった奇跡の結晶！！」で売りに出す！！！【天音かなた/ホロライブ】",
      control: { type: "text" },
    },
  },
};

const Template = (args) => <DragAndDropStory {...args} />;

export const Primary = Template.bind({});
