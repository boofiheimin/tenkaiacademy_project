import { ResponsiveYoutube } from '../../components/ResponsiveYoutube';
import { NavBarPadding } from '../../components/NavBar/NavBarPadding';

const exampleVideo = {
    _id: '6184ac417e0f68b237a9181e',
    videoId: 'jyFSkcpK0WI',
    __v: 0,
    createdAt: new Date('2021-11-05T04:00:01.714Z'),
    description: '',
    duration: 5816,
    mirror: '',
    publishedAt: new Date('2021-10-31T15:52:30.000Z'),
    relatedTweets: [],
    relatedVideos: [],
    source: 'youtube',
    tags: [{ tagNameEN: 'Singing' }, { tagNameEN: 'Singing' }, { tagNameEN: 'Singing' }],
    thumbnail: 'https://i.ytimg.com/vi/jyFSkcpK0WI/hqdefault.jpg',
    timestamps: [],
    title: '【歌枠】HAPPY HALLOWEEN🎃🎵【天音かなた/ホロライブ】',
    updatedAt: new Date('2021-11-05T04:00:01.714Z'),
    uploader: 'Kanata Ch. 天音かなた',
};

const Video = () => {
    return (
        <NavBarPadding>
            <div className="flex justify-center h-full md:py-8 lg:px-10">
                <div className="h-full w-full xl:w-4/5">
                    <ResponsiveYoutube
                        videoId={exampleVideo.videoId}
                        tab
                        tabTitle="Timestamp"
                        tabContent={<div>hi</div>}
                        tabDefaultStatus={false}
                    />
                </div>
            </div>
        </NavBarPadding>
    );
};

export default Video;
