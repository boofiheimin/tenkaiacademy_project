import Link from 'next/link';
import moment from 'moment';
import Image from 'next/image';
import { AiOutlineClockCircle } from 'react-icons/ai';

import { Tag } from './Tag';
import { Video } from '../interfaces/video.interface';

interface Props {
    horizontal?: boolean;
    video: Video;
}

export const VideoCard = ({ horizontal = false, video }: Props) => {
    const { videoId, title, thumbnail, publishedAt, uploader, tags } = video;
    return (
        <Link href={`/archive/videos/${videoId}`} passHref>
            <a>
                <div
                    className={`${
                        horizontal ? 'flex-col h-96 lg:h-auto lg:flex-row lg:w-full lg:align-center' : 'flex-col h-96'
                    } w-80 h-auto flex shadow-md bg-gray-700 canhover:hover:scale-105 canhover:hover:bg-gray-600 cursor-pointer rounded-md mb-2`}
                >
                    <div className="w-80 flex-shrink-0">
                        <div className="aspect-w-16 aspect-h-9">
                            <Image src={thumbnail} layout="fill" objectFit="cover" alt={title} />
                        </div>
                    </div>
                    <div
                        className={`flex flex-col ${horizontal ? 'lg:p-4' : ''} p-2 pb-4 flex-grow items-stretch h-40`}
                    >
                        <div className="line-clamp-2">{title}</div>
                        <div className={`text-gray-400 flex items-center ${horizontal ? 'lg:text-base' : ''} text-sm`}>
                            <AiOutlineClockCircle className="text-xl mr-2" />
                            <span>{moment(publishedAt).fromNow()}</span>
                        </div>
                        <div className="py-2 italic">{uploader}</div>
                        <div className="mt-auto h-6 flex items-center">
                            {tags.slice(0, 2).map((tag) => (
                                <Tag tagNameEN={tag.tagNameEN} key={tag.tagNameEN} className="mr-2 last:mr-0" />
                            ))}
                            {tags.length > 2 && (
                                <span className="rounded-full p-1 text-sm bg-gray-500">{`+ ${tags.length - 2}`}</span>
                            )}
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    );
};
