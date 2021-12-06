import { Timestamp } from '../../interfaces/video.interface';

import { secondsTohhmmss } from '../../lib/utils';

interface Props {
    timestamps: Timestamp[];
    onTimestampClick: (number) => void;
}

interface TimestampProps {
    timestamp: Timestamp;
    onTimestampClick: (number) => void;
}

const Timestamp = ({ timestamp: propTimestamp, onTimestampClick }: TimestampProps) => {
    const { timestamp, description } = propTimestamp;
    const handleTimestampClick = () => {
        onTimestampClick(timestamp);
    };
    return (
        <button className="w-full" type="button" onClick={handleTimestampClick}>
            <div className="p-2 w-full flex items-center mb-2 dark:bg-gray-700 canhover:dark:hover:bg-gray-600 bg-white shadow canhover:hover:bg-gray-100">
                <div>{secondsTohhmmss(timestamp)}</div>
                <div className="ml-4 text-left">{description}</div>
            </div>
        </button>
    );
};

export const Timestamps = ({ timestamps, onTimestampClick }: Props) => {
    return (
        <div className="p-2 xl:dark:bg-gray-900 dark:bg-gray-800 bg-gray-200">
            {timestamps.map((timestamp) => {
                return (
                    <Timestamp
                        timestamp={timestamp}
                        key={timestamp.description + timestamp.timestamp}
                        onTimestampClick={onTimestampClick}
                    />
                );
            })}
        </div>
    );
};
