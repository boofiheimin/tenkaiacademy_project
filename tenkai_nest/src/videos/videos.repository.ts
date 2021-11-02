import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { Tag } from 'src/tags/schemas/tag.schema';
import { Video, VideoDocument } from './schemas/video.schema';

export class VideosRepository extends BaseRepository<VideoDocument> {
    constructor(@InjectModel(Video.name) private videoModel: Model<VideoDocument>) {
        super(videoModel, VideosRepository.name, {
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

    async findByIdWithClip(id: string): Promise<Video> {
        const [video] = await this.videoModel
            .aggregate()
            .match({
                _id: new Types.ObjectId(id),
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
            .project(this.projection);

        if (!video) {
            throw new NotFoundException(`Video<id:${id}> not found`);
        }
        return video;
    }

    async findOneAndUpsert(query: FilterQuery<VideoDocument>, data: Partial<Video>): Promise<Video> {
        return this.videoModel.findOneAndUpdate(query, data, { upsert: true, setDefaultsOnInsert: true });
    }

    async tagCascadeUpdate(tag: Tag): Promise<void> {
        const { tagId, tagNameEN, tagNameJP } = tag;
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
}
