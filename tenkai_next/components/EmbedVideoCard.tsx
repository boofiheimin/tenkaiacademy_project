import Image from 'next/image';

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
        <div className={`bg-gray-800 canhover:hover:bg-gray-600 w-full flex ${className} cursor-pointer`}>
            <div className="w-44 flex-shrink-0">
                <div className="relative aspect-w-16 aspect-h-9">
                    <Image src={exampleVideo.thumbnail} alt={exampleVideo.title} layout="fill" objectFit="cover" />
                </div>
            </div>
            <div className="flex-grow flex flex-col p-2 items-stretch">
                <span className="line-clamp-2">{exampleVideo.title}</span>
                <div className="text-sm italic mt-auto line-clamp-1">{exampleVideo.uploader}</div>
            </div>
        </div>
    );
};
