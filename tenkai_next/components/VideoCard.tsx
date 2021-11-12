import moment from 'moment';
import Image from 'next/image';
import { AiOutlineClockCircle } from 'react-icons/ai';

import { Tag } from './Tag';

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
    tags: [{ tagNameEN: 'Singing' }, { tagNameEN: 'Test' }],
    thumbnail: 'https://i.ytimg.com/vi/jyFSkcpK0WI/hqdefault.jpg',
    timestamps: [],
    title: '【歌枠】HAPPY HALLOWEEN🎃🎵/SINGING【天音かなた/ホロライブ】',
    updatedAt: new Date('2021-11-05T04:00:01.714Z'),
    uploader: 'Kanata Ch. 天音かなた',
};

export const VideoCard = () => {
    return (
        <div className="w-80 h-auto shadow-md bg-gray-700 canhover:hover:scale-105 canhover:hover:bg-gray-600 cursor-pointer rounded-md mb-2">
            <div className="relative w-full h-45">
                <Image src={exampleVideo.thumbnail} layout="fill" objectFit="cover" alt={exampleVideo.title} />
            </div>
            <div className="p-2">
                <div className="line-clamp-2">{exampleVideo.title}</div>
                <div className="text-sm text-gray-400 mt-1">
                    <div className="text-sm text-gray-400 flex items-center">
                        <AiOutlineClockCircle className="text-xl mr-2" />
                        <span className="leading-none">{moment(exampleVideo.publishedAt).fromNow()}</span>
                    </div>
                    <div className="py-2 italic">{exampleVideo.uploader}</div>
                </div>
                <div className="my-4 h-6 ">
                    {exampleVideo.tags.map((tag) => (
                        <Tag tagNameEN={tag.tagNameEN} key={tag.tagNameEN} />
                    ))}
                </div>
            </div>
        </div>
    );
};
