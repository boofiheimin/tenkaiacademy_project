import DragAndDropStory from "./DragAndDropStory";

export default {
  title: "DragAndDrop",
  component: DragAndDropStory,
  argTypes: {
    items: {
      defaultValue: [
        {
          id: "kLwkwIhfOrM",
          text: "kLwkwIhfOrM",
          img: "https://i.ytimg.com/vi/kLwkwIhfOrM/0.jpg",
        },
        {
          id: "7RDVdxJXqN0",
          text: "7RDVdxJXqN0",
          img: "https://i.ytimg.com/vi/7RDVdxJXqN0/0.jpg",
        },
        {
          id: "gtkgGWfPcrA",
          text: "gtkgGWfPcrA",
          img: "https://i.ytimg.com/vi/gtkgGWfPcrA/0.jpg",
        },
      ],
      control: { type: "array" },
    },
  },
};

const Template = (args) => <DragAndDropStory {...args} />;

export const Primary = Template.bind({});
