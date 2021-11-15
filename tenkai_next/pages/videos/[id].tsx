import { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { BiChevronRight } from 'react-icons/bi';
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
    const [timestampMode, setTimestampMode] = useState(true);
    const handleToggle = () => setTimestampMode(!timestampMode);
    return (
        <NavBarPadding>
            <div className="flex justify-center h-full md:py-8 lg:px-10">
                <div className="h-full w-full xl:w-4/5">
                    <div className="flex items-stretch">
                        <div className="w-full">
                            <div className="aspect-w-16 aspect-h-9">
                                <ReactPlayer
                                    url={`https://youtu.be/${exampleVideo.videoId}`}
                                    width="100%"
                                    height="100%"
                                    controls
                                />
                            </div>
                        </div>
                        <div
                            className={`${
                                timestampMode ? 'w-96' : 'w-12'
                            } bg-gray-900 items-stretch transition-all duration-150 hidden xl:flex`}
                        >
                            <div className="h-full w-full flex flex-col">
                                <div className="w-full overflow-hidden">
                                    <button
                                        className="py-3 w-full bg-gray-900 flex items-center"
                                        type="button"
                                        onClick={handleToggle}
                                    >
                                        <div className="w-8 text-2xl pl-3 mr-3">
                                            <BiChevronRight
                                                className={`${
                                                    timestampMode ? '' : '-rotate-180'
                                                } transition-all duration-200`}
                                            />
                                        </div>
                                        <span className={timestampMode ? '' : 'hidden'}>Timestamp</span>
                                    </button>
                                </div>
                                <div className=" border-t border-white h-0" />
                                <div
                                    className={`w-full h-full overflow-y-auto relative flex-grow ${
                                        timestampMode ? '' : 'hidden'
                                    }`}
                                >
                                    <div className="absolute left-0 right-0 top-0 bottom-0 overflow-x-auto">
                                        content here
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NavBarPadding>
    );
};

export default Video;
