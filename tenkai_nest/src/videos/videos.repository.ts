import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { Tag } from 'src/tags/schemas/tag.schema';
import { Video, VideoDocument } from './schemas/video.schema';

@Injectable()
export class VideosRepository extends BaseRepository<VideoDocument> {
    constructor(@InjectModel(Video.name) private videoModel: Model<VideoDocument>) {
        super(videoModel, VideosRepository.name, {
            _id: 1,
            videoId: 1,
            title: 1,
            description: 1,
            thumbnail: 1,
            duration: 1,
            publishedAt: 1,
            tags: 1,
            timestamps: 1,
            relatedTweets: 1,
            relatedVideos: 1,
            uploader: 1,
            channelId: 1,
            source: 1,
            mirror: 1,
        });
    }

    async findByVideoIdWithClip(videoId: string): Promise<Video> {
        this.logger.log(`Finding ${this.collectionName}<videoId:${videoId}> with its clips`);
        const [video] = await this.videoModel
            .aggregate()
            .match({
                videoId,
            })
            .lookup({
                from: 'clips',
                let: { videoId: '$videoId' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: ['$$videoId', '$srcVideos.videoId'],
                            },
                        },
                    },
                    { $sort: { publishedAt: -1 } },
                ],
                as: 'clips',
            })
            .project({ ...this.projection, clips: 1 });

        if (!video) {
            throw new NotFoundException(`Video<videoId:${videoId}> not found`);
        }
        return video;
    }

    async findOneAndUpsert(filter: FilterQuery<VideoDocument>, data: Partial<Video>): Promise<Video> {
        this.logger.log(`Finding ${this.collectionName}<filter:${JSON.stringify(filter)}> and upsert`);
        return this.videoModel.findOneAndUpdate(filter, data, { upsert: true, setDefaultsOnInsert: true });
    }

    async tagCascadeUpdate(tag: Tag): Promise<void> {
        const { tagId, tagNameEN, tagNameJP } = tag;
        this.logger.log(
            `Updating tags for ${this.collectionName}<tagId:${tagId}> with ${JSON.stringify({ tagNameEN, tagNameJP })}`,
        );
        await this.videoModel.updateMany(
            { 'tags.tagId': tagId },
            {
                $set: {
                    'tags.$.tagNameEN': tagNameEN,
                    'tags.$.tagNameJP': tagNameJP,
                },
            },
            {
                new: true,
            },
        );
    }

    async tagCascadeDelete(tag: Tag): Promise<void> {
        const { tagId } = tag;
        this.logger.log(`Removing tags for ${this.collectionName}<tagId:${tagId}>`);
        await this.videoModel.updateMany(
            { 'tags.tagId': tagId },
            {
                $pull: {
                    tags: { tagId },
                },
            },
            {
                new: true,
            },
        );
    }

    async findByVideoId(videoId: string): Promise<Video> {
        this.logger.log(`Finding ${this.collectionName}<videoId:${videoId}>`);
        return this.videoModel.findOne({ videoId });
    }
}
