import { v4 as uuidV4 } from 'uuid';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { MdContentCut } from 'react-icons/md';
import moment from 'moment';
import Link from 'next/link';
import { BsYoutube, BsTwitter } from 'react-icons/bs';

import { ResponsiveYoutube } from '../../components/ResponsiveYoutube';
import { NavBarPadding } from '../../components/NavBar/NavBarPadding';
import { EmbedVideoCard } from '../../components/EmbedVideoCard';
import { Tag } from '../../components/Tag';

import { useAppStore } from '../../lib/stores';

const exampleVideo = {
    _id: '6184ac417e0f68b237a9181e',
    videoId: 'jyFSkcpK0WI',
    createdAt: new Date('2021-11-05T04:00:01.714Z'),
    summary: 'sth',
    duration: 5816,
    mirror: '',
    publishedAt: new Date('2021-10-31T15:52:30.000Z'),
    relatedTweets: ['1460158072421163008', '1460211129834041347'],
    relatedVideos: [1],
    source: 'youtube',
    tags: [{ tagNameEN: 'Singing' }, { tagNameEN: 'Singing' }, { tagNameEN: 'Singing' }],
    thumbnail: 'https://i.ytimg.com/vi/jyFSkcpK0WI/hqdefault.jpg',
    timestamps: [],
    title: '【歌枠】HAPPY HALLOWEEN🎃🎵【天音かなた/ホロライブ】',
    updatedAt: new Date('2021-11-05T04:00:01.714Z'),
    uploader: 'Kanata Ch. 天音かなた',
    channelId: 'UCZlDXzGoo7d44bwdNObFacg',
};

const Video = () => {
    const darkMode = useAppStore((state) => state.darkMode);

    const colNumber = (exampleVideo.relatedTweets.length ? 1 : 0) + (exampleVideo.relatedVideos.length ? 1 : 0);

    return (
        <NavBarPadding>
            <div className="flex justify-center h-full md:py-8 lg:px-10">
                <div className="h-full w-full xl:w-4/5">
                    <ResponsiveYoutube
                        videoId={exampleVideo.videoId}
                        tab
                        tabTitle="Timestamp"
                        tabContent={<div>hi</div>}
                    />
                    <div className="w-full grid grid-cols-3 gap-1 mt-1">
                        <div className="col-span-2">
                            <div className="bg-gray-900 p-2">
                                <div className="text-xl">{exampleVideo.title}</div>
                                <div className="text-gray-400 py-1">{`Published at ${moment(
                                    exampleVideo.publishedAt,
                                ).format('MMM DD, YYYY HH:mm:ss')}`}</div>
                                <Link href={`https://www.youtube.com/channel/${exampleVideo.channelId}`} passHref>
                                    <button type="button" className="px-2 py-1 bg-red-500 rounded-xl flex items-center">
                                        <BsYoutube className="mr-2" />
                                        {exampleVideo.uploader}
                                    </button>
                                </Link>
                            </div>
                            {exampleVideo.tags.length > 0 && (
                                <div className="bg-gray-900 mt-1">
                                    <div className="px-2 py-4 flex items-center">
                                        <span className="mr-2">Tags :</span>
                                        {exampleVideo.tags.map((tag) => (
                                            <Tag className="mr-2 last:mr-0" tagNameEN={tag.tagNameEN} key={uuidV4()} />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {exampleVideo.summary && (
                                <div className="bg-gray-900 mt-1">
                                    <div className="p-2">
                                        <span>Summary</span>
                                        <div className="border-b border-white mb-1 w-1/2" />
                                        <p>{exampleVideo.summary}</p>
                                    </div>
                                </div>
                            )}
                            <div className={`grid ${colNumber === 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-1 mt-1`}>
                                {exampleVideo.relatedTweets.length > 0 && (
                                    <div>
                                        <div className="bg-twitter p-2 flex items-center">
                                            <BsTwitter className="mr-2" />
                                            <span>Tweets</span>
                                        </div>
                                        <div className="bg-gray-900 p-1" id="tweet-container">
                                            {exampleVideo.relatedTweets.map((tweetId) => (
                                                <TwitterTweetEmbed
                                                    tweetId={tweetId}
                                                    key={uuidV4()}
                                                    options={{ theme: darkMode ? 'dark' : 'light' }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {exampleVideo.relatedVideos.length > 0 && (
                                    <div>
                                        <div className="bg-red-500 p-2 flex items-center">
                                            <BsYoutube className="mr-2" />
                                            <span>Related Videos</span>
                                        </div>
                                        <div className="bg-gray-900 p-1 flex flex-col items-center">
                                            <EmbedVideoCard className="mb-1 last:mb-0" />
                                            <EmbedVideoCard className="mb-1 last:mb-0" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="bg-gray-900">
                                <div className="p-2 flex items-center justify-end">
                                    <MdContentCut />
                                    <span className="ml-2 text-xl">Clips</span>
                                </div>
                                <div className="p-1">
                                    <EmbedVideoCard className="mb-1 last:mb-0" />
                                    <EmbedVideoCard className="mb-1 last:mb-0" />
                                    <EmbedVideoCard className="mb-1 last:mb-0" />
                                    <EmbedVideoCard className="mb-1 last:mb-0" />
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
