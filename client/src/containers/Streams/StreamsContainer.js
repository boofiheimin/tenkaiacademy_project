import VideoCards from "../../components/VideoCards/VideoCards";

const StreamsRoute = () => {
  const testVideos = [
    {
      title: "アディショナルメモリー／天音かなた(cover)",
      thumbnail: "https://i.ytimg.com/vi/0ziNItsX3iQ/hqdefault.jpg",
      videoId: "0ziNItsX3iQ",
      type: "COVER",
      tags: [{ id: 1, name: "COVER" }],
      publishedAt: "2021-07-10T11:00:12Z",
    },
    {
      title:
        "【Minecraft】「××時間かかった奇跡の結晶！！」で売りに出す！！！【天音かなた/ホロライブ】",
      thumbnail: "https://i.ytimg.com/vi/hIG5Dhlke7I/hqdefault.jpg",
      videoId: "hIG5Dhlke7I",
      type: "GAME",
      tags: [
        { id: 1, name: "GAME" },
        { id: 2, name: "MINECRAFT" },
      ],
      publishedAt: "2021-07-09T21:07:40Z",
    },
    {
      title:
        "【Minecraft】闇市店主、激激激レア青ウーパーチャレンジ！！【天音かなた/ホロライブ】",
      thumbnail: "https://i.ytimg.com/vi/aNGCGkyZLc8/hqdefault.jpg",
      videoId: "aNGCGkyZLc8",
      type: "GAME",
      tags: [
        { id: 1, name: "GAME" },
        { id: 2, name: "MINECRAFT" },
      ],
      publishedAt: "2021-07-09T00:49:10Z",
    },
    {
      title: "07/10 (sat) pm8:00",
      thumbnail: "https://i.ytimg.com/vi/De1u5x78AAM/hqdefault.jpg",
      videoId: "De1u5x78AAM",
      type: "ANNOUCEMENT",
      tags: [{ id: 1, name: "ANNOUCEMENT" }],
      publishedAt: "2021-07-08T00:43:30Z",
    },
    {
      title: "アディショナルメモリー／天音かなた(cover)",
      thumbnail: "https://i.ytimg.com/vi/0ziNItsX3iQ/hqdefault.jpg",
      videoId: "0ziNItsX3iQ",
      type: "COVER",
      tags: [{ id: 1, name: "COVER" }],
      publishedAt: "2021-07-10T11:00:12Z",
    },
    {
      title:
        "【Minecraft】「××時間かかった奇跡の結晶！！」で売りに出す！！！【天音かなた/ホロライブ】",
      thumbnail: "https://i.ytimg.com/vi/hIG5Dhlke7I/hqdefault.jpg",
      videoId: "hIG5Dhlke7I",
      type: "GAME",
      tags: [
        { id: 1, name: "GAME" },
        { id: 2, name: "MINECRAFT" },
      ],
      publishedAt: "2021-07-09T21:07:40Z",
    },
    {
      title:
        "【Minecraft】闇市店主、激激激レア青ウーパーチャレンジ！！【天音かなた/ホロライブ】",
      thumbnail: "https://i.ytimg.com/vi/aNGCGkyZLc8/hqdefault.jpg",
      videoId: "aNGCGkyZLc8",
      type: "GAME",
      tags: [
        { id: 1, name: "GAME" },
        { id: 2, name: "MINECRAFT" },
      ],
      publishedAt: "2021-07-09T00:49:10Z",
    },
    {
      title: "07/10 (sat) pm8:00",
      thumbnail: "https://i.ytimg.com/vi/De1u5x78AAM/hqdefault.jpg",
      videoId: "De1u5x78AAM",
      type: "ANNOUCEMENT",
      tags: [{ id: 1, name: "ANNOUCEMENT" }],
      publishedAt: "2021-07-08T00:43:30Z",
    },
  ];

  return <VideoCards videos={testVideos} />;
};

export default StreamsRoute;
