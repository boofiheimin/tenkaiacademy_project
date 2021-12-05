import { EmbedTag } from './tag.interface';

export interface Timestamp {
    timestamp: number;
    description: string;
}

export interface EmbedVideo {
    videoId: string;
    title: string;
    uploader: string;
    channelId: string;
    thumbnail: string;
    publishedAt: Date;
    existing: boolean;
}

export enum VideoSource {
    YOUTUBE_MANUAL = 'youtube-manual',
    MANUAL = 'manual',
    YOUTUBE = 'youtube',
}

export interface Video {
    videoId: string;
    title: string;
    summary: string;
    thumbnail: string;
    duration: number;
    publishedAt: Date;
    tags: EmbedTag[];
    timestamps: Timestamp[];
    relatedTweets: string[];
    relatedVideos: EmbedVideo[];
    uploader: string;
    channelId: string;
    source: VideoSource;
    mirror: string;
    isPrivate: boolean;
    clips: any[]; // TODO : change this when implement clips
}

export interface VideosResponse {
    docs: Video[];
    totalCount: number;
}
