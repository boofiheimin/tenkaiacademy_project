import moment from 'moment';
import Image from 'next/image';
import { AiOutlineClockCircle } from 'react-icons/ai';

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
    title: '【歌枠】HAPPY HALLOWEEN🎃🎵【天音かなた/ホロライブ】xxxxxxxx',
    updatedAt: new Date('2021-11-05T04:00:01.714Z'),
    uploader: 'Kanata Ch. 天音かなた',
};

interface Props {
    className?: string;
}

export const EmbedVideoCard = ({ className = '' }: Props) => {
    // TODO :: do router.push thing here. depends on is videoId existing or not
    return (
        <div className={`bg-gray-800 hover:bg-gray-600 max-w-xl w-full flex ${className} cursor-pointer`}>
            <div className="w-52 flex-shrink-0">
                <div className="relative aspect-w-16 aspect-h-9">
                    <Image src={exampleVideo.thumbnail} alt={exampleVideo.title} layout="fill" objectFit="cover" />
                </div>
            </div>
            <div className="flex-grow flex flex-col p-2 items-stretch">
                <span className="line-clamp-2">{exampleVideo.title}</span>
                <div className="flex items-center text-gray-400 text-sm">
                    <AiOutlineClockCircle className="text-xl mr-2" />
                    <span>{moment(exampleVideo.publishedAt).fromNow()}</span>
                </div>
                <div className="text-sm italic mt-auto">{exampleVideo.uploader}</div>
            </div>
        </div>
    );
};
