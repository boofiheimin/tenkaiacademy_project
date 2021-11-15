import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import Youtube from 'youtube-api';
import { get } from 'lodash';
import moment from 'moment';

export interface YoutubeVideo {
    videoId: string;
    title: string;
    thumbnail: string;
    uploader: string;
    duration: number;
    publishedAt: Date;
    channelId: string;
}

@Injectable()
export class YoutubeService {
    constructor(private configService: ConfigService) {}

    async fetchVideo(videoId: string): Promise<YoutubeVideo> {
        const results = await Youtube.videos.list({
            maxResults: 1,
            id: videoId,
            part: 'snippet, contentDetails',
        });

        const video = get(results, 'data.items[0]');
        if (video) {
            return {
                videoId: video.id,
                title: get(video, 'snippet.title'),
                thumbnail:
                    get(video, 'snippet.thumbnails.high.url') || `https://img.youtube.com/vi/${videoId}/default.jpg`,
                uploader: get(video, 'snippet.channelTitle'),
                duration: moment.duration(get(video, 'contentDetails.duration')).asSeconds(),
                publishedAt: new Date(get(video, 'snippet.publishedAt')),
                channelId: get(video, 'snippet.channelId'),
            };
        }
        return null;
    }

    async fetchAllVideoIds(): Promise<string[]> {
        const channel = await Youtube.channels.list({
            part: 'contentDetails',
            id: this.configService.get('channel_id'),
        });

        const uploadPlaylistID = get(channel, 'data.items[0].contentDetails.relatedPlaylists.uploads');

        const firstSet = await Youtube.playlistItems.list({
            maxResults: 50,
            playlistId: uploadPlaylistID,
            part: 'contentDetails',
            order: 'date',
        });

        let videoIds: string[] = firstSet.data.items.map((item: any) => {
            return item.contentDetails.videoId;
        });

        let pageToken: string = firstSet.data.nextPageToken;

        while (true) {
            const { data } = await Youtube.playlistItems.list({
                maxResults: 50,
                playlistId: uploadPlaylistID,
                part: 'contentDetails',
                order: 'date',
                pageToken,
            });

            const nextIds = data.items.map((item: any) => {
                return item.contentDetails.videoId;
            });

            videoIds = videoIds.concat(nextIds);
            if (!data.nextPageToken) {
                break;
            }
            pageToken = data.nextPageToken;
        }

        return videoIds;
    }
}
