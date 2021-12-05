import { EmbedVideoCard } from '../EmbedVideoCard';

export const EmbedVideos = () => (
    <div className="p-1 flex flex-col items-center bg-gray-900">
        <EmbedVideoCard className="mb-1 last:mb-0" />
        <EmbedVideoCard className="mb-1 last:mb-0" />
        <EmbedVideoCard className="mb-1 last:mb-0" />
        <EmbedVideoCard className="mb-1 last:mb-0" />
    </div>
);
