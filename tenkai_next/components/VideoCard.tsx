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
    tags: [{ tagNameEN: 'Singing' }, { tagNameEN: 'Singing' }, { tagNameEN: 'Singing' }],
    thumbnail: 'https://i.ytimg.com/vi/jyFSkcpK0WI/hqdefault.jpg',
    timestamps: [],
    title: '【歌枠】HAPPY HALLOWEEN🎃🎵【天音かなた/ホロライブ】',
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
                horizontal ? 'flex-col h-96 lg:h-auto lg:flex-row lg:w-full lg:align-center' : 'flex-col h-96'
            } w-80 h-auto flex shadow-md bg-gray-700 canhover:hover:scale-105 canhover:hover:bg-gray-600 cursor-pointer rounded-md mb-2`}
        >
            <div className="w-80 flex-shrink-0">
                <div className="aspect-w-16 aspect-h-9">
                    <Image src={exampleVideo.thumbnail} layout="fill" objectFit="cover" alt={exampleVideo.title} />
                </div>
            </div>
            <div className={`flex flex-col ${horizontal ? 'lg:p-4' : ''} p-2 pb-4 flex-grow items-stretch`}>
                <div className="line-clamp-2">{exampleVideo.title}</div>
                <div className={`text-gray-400 flex items-center ${horizontal ? 'lg:text-base' : ''} text-sm`}>
                    <AiOutlineClockCircle className="text-xl mr-2" />
                    <span>{moment(exampleVideo.publishedAt).fromNow()}</span>
                </div>
                <div className="py-2 italic">{exampleVideo.uploader}</div>
                <div className="mt-auto h-6 flex items-center">
                    {exampleVideo.tags.slice(0, 2).map((tag) => (
                        <Tag tagNameEN={tag.tagNameEN} key={tag.tagNameEN} className="mr-2 last:mr-0" />
                    ))}
                    {exampleVideo.tags.length > 2 && (
                        <span className="rounded-full p-1 text-sm bg-gray-500">{`+ ${
                            exampleVideo.tags.length - 2
                        }`}</span>
                    )}
                </div>
            </div>
        </div>
    );
};
