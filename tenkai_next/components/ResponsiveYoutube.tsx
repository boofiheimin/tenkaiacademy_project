import { forwardRef, ReactNode, useImperativeHandle, useRef, useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import ReactPlayer from 'react-player';

interface Props {
    tab?: boolean;
    tabTitle?: string;
    tabContent?: ReactNode;
    tabDefaultStatus?: boolean;
    videoId: string;
    className?: string;
}

const ResponsiveYoutube = forwardRef(
    ({ tab = false, tabTitle = '', tabContent = <div />, tabDefaultStatus = true, videoId, className }: Props, ref) => {
        const playerRef = useRef(null);
        const [showTab, setShowTab] = useState(tabDefaultStatus);
        const [playing, setPlaying] = useState(true);
        const handleTabToggle = () => setShowTab(!showTab);

        useImperativeHandle(ref, () => ({
            seekTime(time: number) {
                playerRef.current.seekTo(time);
                setPlaying(true);
            },
        }));

        const handleOnPause = () => setPlaying(false);
        const handleOnPlay = () => setPlaying(true);

        return (
            <div className={className}>
                <div className="flex items-stretch">
                    <div className="w-full">
                        <div className="aspect-w-16 aspect-h-9">
                            <ReactPlayer
                                url={`https://youtu.be/${videoId}`}
                                width="100%"
                                height="100%"
                                controls
                                ref={playerRef}
                                playing={playing}
                                onPause={handleOnPause}
                                onPlay={handleOnPlay}
                                playsinline
                            />
                        </div>
                    </div>
                    {tab && (
                        <div
                            className={`${
                                showTab ? 'w-96' : 'w-12'
                            } bg-gray-900 items-stretch transition-all duration-150 hidden lg:flex`}
                        >
                            <div className="h-full w-full flex flex-col">
                                <div className="w-full overflow-hidden">
                                    <button
                                        className="py-3 w-full bg-gray-900 flex items-center"
                                        type="button"
                                        onClick={handleTabToggle}
                                    >
                                        <div className="w-8 text-2xl pl-3 mr-3">
                                            <BiChevronRight
                                                className={`${
                                                    showTab ? '' : '-rotate-180'
                                                } transition-all duration-200`}
                                            />
                                        </div>
                                        <span className={showTab ? '' : 'hidden'}>{tabTitle}</span>
                                    </button>
                                </div>
                                <div className=" border-t border-white h-0" />
                                <div
                                    className={`w-full h-full overflow-y-auto relative flex-grow ${
                                        showTab ? '' : 'hidden'
                                    }`}
                                >
                                    <div className="absolute left-0 right-0 top-0 bottom-0 overflow-x-auto">
                                        {tabContent}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    },
);

ResponsiveYoutube.displayName = 'ResponsiveYoutube';

export { ResponsiveYoutube };
