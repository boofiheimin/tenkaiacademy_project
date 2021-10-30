import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import BaseService from 'src/base/base.service';
import { FindVideosParamsDto } from './dto/find-videos.params.dto';
import { FindVideosResponseDto } from './dto/find-videos.response.dto';
import { Video } from './video.schema';
interface TagIdFilter {
    'tags.tagId': number;
}
@Injectable()
export class VideosService extends BaseService<Video> {
    constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {
        super(videoModel, new Logger(VideosService.name), {
            _id: 1,
            videoId: 1,
            duration: 1,
            publishedAt: 1,
            relatedTweets: 1,
            relatedVideos: 1,
            source: 1,
            tags: 1,
            thumbnail: 1,
            timestamps: 1,
            title: 1,
            uploader: 1,
        });
    }

    public async findVideos(filter: FindVideosParamsDto): Promise<FindVideosResponseDto> {
        const { title, from, to, uploader, tags, limit, skip, sortOrder } = filter;

        const tagsFilter: TagIdFilter[] = [];

        (tags || []).forEach((tag: number) => {
            tagsFilter.push({ 'tags.tagId': tag });
        });

        const searchQuery = {
            ...(title && { title: new RegExp(title, 'i') }),
            ...(uploader && { uploader: new RegExp(uploader, 'i') }),
            ...((from || to) && {
                publishedAt: { ...(from && { $gte: from }), ...(to && { $lte: to }) },
            }),
            ...(tagsFilter.length > 0 && { $and: tagsFilter }),
        };

        return this.find({
            ...searchQuery,
            limit,
            skip,
            sort: { publishedAt: sortOrder ? 1 : -1 },
        });
    }
}
