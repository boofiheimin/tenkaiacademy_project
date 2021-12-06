import Link from 'next/link';
import moment from 'moment';
import Image from 'next/image';
import { AiOutlineClockCircle } from 'react-icons/ai';

import { Tag } from './Tag';
import { Video } from '../interfaces/video.interface';
import { HIDDEN_TAG } from '../lib/tagUtils';

const durationFormat = (duration) => {
    if (duration < 3600) {
        return moment('2015-01-01').startOf('day').seconds(duration).format('m:ss');
    }
    return moment('2015-01-01').startOf('day').seconds(duration).format('H:mm:ss');
};
interface Props {
    horizontal?: boolean;
    video: Video;
}

export const VideoCard = ({ horizontal = false, video }: Props) => {
    const { videoId, title, thumbnail, publishedAt, uploader, tags, duration } = video;
    const filteredTags = tags.filter((tag) => !HIDDEN_TAG.includes(tag.tagNameEN));
    return (
        <Link href={`/archive/videos/${videoId}`} passHref>
            <a>
                <div
                    className={`${
                        horizontal ? 'flex-col h-96 lg:h-auto lg:flex-row lg:w-full lg:align-center' : 'flex-col h-96'
                    } w-80 h-auto flex shadow-md dark:bg-gray-900 bg-white canhover:hover:scale-105 canhover:dark:hover:bg-gray-600 canhover:hover:bg-gray-200 cursor-pointer rounded-md mb-2`}
                >
                    <div className="w-80 flex-shrink-0 relative">
                        <div className="aspect-w-16 aspect-h-9">
                            <Image src={thumbnail} layout="fill" objectFit="cover" alt={title} />
                        </div>
                        <div
                            className="absolute right-1 bottom-1 text-white text-sm"
                            style={{
                                backgroundColor: 'rgba(0,0,0,0.75)',
                                padding: '0 2px',
                            }}
                        >
                            {durationFormat(duration)}
                        </div>
                    </div>
                    <div
                        className={`flex flex-col ${horizontal ? 'lg:p-4' : ''} p-2 pb-4 flex-grow items-stretch h-40`}
                    >
                        <div className="line-clamp-2">{title}</div>
                        <div
                            className={`text-gray-500 dark:text-gray-400 flex items-center ${
                                horizontal ? 'lg:text-base' : ''
                            } text-sm`}
                        >
                            <AiOutlineClockCircle className="text-xl mr-2" />
                            <span>{moment(publishedAt).fromNow()}</span>
                        </div>
                        <div className="py-2 italic">{uploader}</div>
                        <div className="mt-auto h-6 flex items-center">
                            {filteredTags.slice(0, 2).map((tag) => (
                                <Tag
                                    tagNameEN={tag.tagNameEN}
                                    key={tag.tagNameEN}
                                    className={`mr-2 last:mr-0 ${
                                        tags.length === 2 ? 'twoTagsContainer' : 'tagsContainer'
                                    }`}
                                />
                            ))}
                            {filteredTags.length > 2 && (
                                <span className="rounded-full p-1 text-sm bg-gray-500 tagsContainer text-white">{`+ ${
                                    filteredTags.length - 2
                                }`}</span>
                            )}
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    );
};
