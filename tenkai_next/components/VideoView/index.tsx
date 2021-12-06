import { Tab } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';

import { v4 as uuidV4 } from 'uuid';
import { MdContentCut } from 'react-icons/md';
import moment from 'moment';
import Link from 'next/link';
import { BsYoutube, BsTwitter } from 'react-icons/bs';

import { Fragment, useRef, useState } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';

import { EmbedTweets } from './EmbedTweets';
import { EmbedVideos } from './EmbedVideos';
import { Timestamps } from './Timestamps';

import { Video } from '../../interfaces/video.interface';
import { ResponsiveYoutube } from '../ResponsiveYoutube';
import { Tag } from '../Tag';

interface Props {
    video: Video;
}

export const VideoView = ({ video }: Props) => {
    const youtubeRef = useRef(null);
    const [openDetailTab, setOpenDetailTab] = useState(false);
    const handleToggleDetailTab = () => setOpenDetailTab(!openDetailTab);

    const {
        videoId,
        title,
        publishedAt,
        uploader,
        tags = [],
        summary,
        relatedTweets = [],
        relatedVideos = [],
        clips = [],
        timestamps = [],
        channelId,
    } = video;

    const colNumber = (relatedTweets.length ? 1 : 0) + (relatedVideos.length ? 1 : 0);
    const tabNumber =
        (relatedTweets.length ? 1 : 0) +
        (relatedVideos.length ? 1 : 0) +
        (clips.length ? 1 : 0) +
        (timestamps.length ? 1 : 0);

    const handleSeek = (time: number) => {
        youtubeRef.current.seekTime(time);
    };

    return (
        <div className="flex justify-center h-full">
            <div className="h-full flex flex-col" style={{ width: 'min(calc(( 100vh - 4rem ) * 16 / 10), 100%)' }}>
                <ResponsiveYoutube
                    ref={youtubeRef}
                    videoId={videoId}
                    tab={timestamps.length > 0}
                    tabTitle="Timestamp"
                    tabContent={<Timestamps timestamps={timestamps} onTimestampClick={handleSeek} />}
                    className="smMax:sticky smMax:top-16"
                />
                <div className="w-full xl:grid-cols-3 grid-cols-1 gap-1 mt-1 hidden lg:grid">
                    <div className={clips.length > 0 ? 'col-span-2' : 'col-span-3'}>
                        <div className="dark:bg-gray-900 bg-white shadow p-2">
                            <div className="text-xl">{title}</div>
                            <div className="dark:text-gray-400 text-gray-500 py-1">{`Published at ${moment(
                                publishedAt,
                            ).format('MMM DD, YYYY HH:mm:ss')}`}</div>
                            <Link href={`https://www.youtube.com/channel/${channelId}`} passHref>
                                <button
                                    type="button"
                                    className="px-2 py-1 bg-red-500 text-white rounded-xl flex items-center"
                                >
                                    <BsYoutube className="mr-2" />
                                    {uploader}
                                </button>
                            </Link>
                        </div>
                        {tags.length > 0 && (
                            <div className="dark:bg-gray-900 bg-white shadow mt-1">
                                <div className="px-2 py-4 flex items-center flex-wrap">
                                    <span className="mr-2">Tags :</span>
                                    {tags.map((tag) => (
                                        <Tag
                                            className="mr-2 last:mr-0 my-2"
                                            tagNameEN={tag.tagNameEN}
                                            key={uuidV4()}
                                            full
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        {summary && (
                            <div className="dark:bg-gray-900 bg-white shadow mt-1">
                                <div className="p-2">
                                    <span>Summary</span>
                                    <div className="border-b dark:border-white border-black mb-1 w-1/2" />
                                    <p>{summary}</p>
                                </div>
                            </div>
                        )}
                        <div
                            className={`grid ${
                                colNumber === 2 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
                            } gap-1 mt-1`}
                        >
                            {relatedTweets.length > 0 && (
                                <div>
                                    <div className="bg-twitter p-2 flex items-center text-white">
                                        <BsTwitter className="mr-2" />
                                        <span>Tweets</span>
                                    </div>
                                    <EmbedTweets tweetIds={relatedTweets} />
                                </div>
                            )}
                            {relatedVideos.length > 0 && (
                                <div>
                                    <div className="bg-red-500 p-2 flex items-center text-white">
                                        <BsYoutube className="mr-2" />
                                        <span>Videos</span>
                                    </div>
                                    <EmbedVideos />
                                </div>
                            )}
                        </div>
                    </div>
                    {clips.length > 0 && (
                        <div>
                            <div>
                                <div className="p-2 flex items-center dark:bg-gray-900 bg-white shadow text-white">
                                    <MdContentCut />
                                    <span className="ml-2">Clips</span>
                                </div>
                                <div className="p-1 flex flex-col items-center dark:bg-gray-900 bg-white shadow">
                                    <EmbedVideos />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-full lg:hidden flex flex-col flex-grow">
                    <div className="dark:bg-gray-900 bg-white shadow p-2">
                        <div className="text-xl">{title}</div>
                        <div className="dark:text-gray-400 text-gray-500 py-1">{`Published at ${moment(
                            publishedAt,
                        ).format('MMM DD, YYYY HH:mm:ss')}`}</div>
                        <Link href={`https://www.youtube.com/channel/${channelId}`} passHref>
                            <button type="button">
                                <div className="px-2 py-1 bg-red-500 rounded-xl flex items-center">
                                    <BsYoutube className="mr-2" />
                                    <div className="whitespace-nowrap overflow-hidden overflow-ellipsis  max-w-xs">{`${uploader}`}</div>
                                </div>
                            </button>
                        </Link>
                    </div>
                    {(tags.length > 0 || summary) && (
                        <>
                            <button
                                type="button"
                                className="w-full dark:bg-gray-900 bg-white shadow h-8 grid place-items-center"
                                onClick={handleToggleDetailTab}
                            >
                                <BiChevronDown
                                    className={`text-2xl transition-all duration-100 ${
                                        openDetailTab ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            <div className={`${openDetailTab ? '' : 'hidden'}`}>
                                {tags.length > 0 && (
                                    <div className="dark:bg-gray-900 bg-white shadow mt-1">
                                        <div className="px-2 py-4 flex items-center">
                                            <span className="mr-2">Tags :</span>
                                            {tags.map((tag) => (
                                                <Tag
                                                    className="mr-2 last:mr-0 my-1"
                                                    tagNameEN={tag.tagNameEN}
                                                    key={uuidV4()}
                                                    full
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {summary && (
                                    <div className="bg-gray-900 mt-1">
                                        <div className="p-2">
                                            <span>Summary</span>
                                            <div className="border-b border-white mb-1 w-1/2" />
                                            <p>{summary}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                    <div className="mt-1 overflow-y-auto flex-grow flex flex-col">
                        <Tab.Group>
                            <Tab.List className="grid grid-flow-col" style={{ gridAutoColumns: 'minmax(0,1fr)' }}>
                                {clips.length > 0 && (
                                    <Tab as={Fragment}>
                                        <button type="button" className="w-full p-1 bg-gray-900 text-white">
                                            <div className="flex items-center justify-center flex-col md:flex-row">
                                                <MdContentCut className="text-xl md:text-base" />
                                                <span className="md:ml-1 text-xs md:text-base">Clips</span>
                                            </div>
                                        </button>
                                    </Tab>
                                )}
                                {timestamps.length > 0 && (
                                    <Tab as={Fragment}>
                                        <button
                                            type="button"
                                            className="w-full p-1 bg-gray-700 text-white hidden lgMax:block"
                                        >
                                            <div className="flex items-center justify-center flex-col md:flex-row">
                                                <AiOutlineClockCircle className="text-xl md:text-base" />
                                                <span className="md:ml-1 text-xs md:text-base">Timestamp</span>
                                            </div>
                                        </button>
                                    </Tab>
                                )}

                                {relatedVideos.length > 0 && (
                                    <Tab as={Fragment}>
                                        <button type="button" className="w-full p-1 bg-red-500 text-white">
                                            <div className="flex items-center justify-center flex-col md:flex-row">
                                                <BsYoutube className="text-xl md:text-base" />
                                                <span className="md:ml-1 text-xs md:text-base">Videos</span>
                                            </div>
                                        </button>
                                    </Tab>
                                )}
                                {relatedTweets.length > 0 && (
                                    <Tab as={Fragment}>
                                        <button type="button" className="w-full p-1 bg-twitter text-white">
                                            <div className="flex items-center justify-center flex-col md:flex-row">
                                                <BsTwitter className="text-xl md:text-base" />
                                                <span className="md:ml-1 text-xs md:text-base">Tweets</span>
                                            </div>
                                        </button>
                                    </Tab>
                                )}
                            </Tab.List>
                            <Tab.Panels className="flex-grow">
                                {clips.length > 0 && (
                                    <Tab.Panel>
                                        <div className={`w-full bg-gray-900 h-4 ${tabNumber === 1 ? 'hidden' : ''}`} />
                                        <EmbedVideos />
                                    </Tab.Panel>
                                )}
                                {timestamps.length > 0 && (
                                    <Tab.Panel className="h-full">
                                        <div
                                            className={`w-full bg-gray-700 h-4 ${
                                                tabNumber === 1 ? 'hidden' : ''
                                            } hidden lgMax:block`}
                                        />
                                        <Timestamps timestamps={timestamps} onTimestampClick={handleSeek} />
                                    </Tab.Panel>
                                )}
                                {relatedVideos.length > 0 && (
                                    <Tab.Panel>
                                        <div className={`w-full bg-red-500 h-4 ${tabNumber === 1 ? 'hidden' : ''}`} />
                                        <EmbedVideos />
                                    </Tab.Panel>
                                )}
                                {relatedTweets.length > 0 && (
                                    <Tab.Panel className="flex flex-col h-full">
                                        <div className={`w-full bg-twitter h-4 ${tabNumber === 1 ? 'hidden' : ''}`} />
                                        <EmbedTweets tweetIds={relatedTweets} />
                                    </Tab.Panel>
                                )}
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </div>
        </div>
    );
};
