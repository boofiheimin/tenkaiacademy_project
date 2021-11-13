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

interface Props {
    horizontal?: boolean;
}

export const VideoCard = ({ horizontal = false }: Props) => {
    return (
        <div
            className={`${
                horizontal ? 'lg:flex lg:w-full lg:h-50' : ''
            } w-80 h-auto shadow-md bg-gray-700 canhover:hover:scale-105 canhover:hover:bg-gray-600 cursor-pointer rounded-md mb-2`}
        >
            <div className={`relative ${horizontal ? 'lg:w-80 lg:h-50' : ''} w-full h-45`}>
                <Image src={exampleVideo.thumbnail} layout="fill" objectFit="cover" alt={exampleVideo.title} />
            </div>
            <div className={`${horizontal ? 'lg:p-4' : ''} p-2`}>
                <div className={`line-clamp-2 ${horizontal ? 'lg:text-xl' : ''}`}>{exampleVideo.title}</div>
                <div className={`text-gray-400 flex items-center ${horizontal ? 'lg:text-base' : ''} text-sm`}>
                    <AiOutlineClockCircle className="text-xl mr-2" />
                    <span>{moment(exampleVideo.publishedAt).fromNow()}</span>
                </div>
                <div className="py-2 italic">{exampleVideo.uploader}</div>
                <div className="my-4 h-6 ">
                    {exampleVideo.tags.map((tag) => (
                        <Tag tagNameEN={tag.tagNameEN} key={tag.tagNameEN} className="mr-2 last:mr-0" />
                    ))}
                </div>
            </div>
        </div>
    );
};
