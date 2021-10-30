import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IEmbedTags } from 'src/tags/tag.schema';

interface ITimestamp {
    timestamp: number;
    description: string;
}

export interface IRelatedVideo {
    videoId: string;
    existing: boolean;
    uploader: string;
    title: string;
    thumbnail: string;
    publishedAt: Date;
    id: string;
}

export enum VideoSource {
    YOUTUBE_MANUAL = 'youtube-manual',
    MANUAL = 'manual',
    YOUTUBE = 'youtube',
}

@Schema({ timestamps: true })
export class Video extends Document {
    @Prop({ unique: true, required: [true, 'Please provide a videoIds'] })
    videoId: string;

    @Prop({ required: [true, 'Please provide a title'] })
    title: string;

    @Prop()
    description: string;

    @Prop()
    thumbnail: string;

    @Prop({ default: 0 })
    duration: number;

    @Prop({ default: new Date() })
    publishedAt: Date;

    @Prop({ default: [] })
    tags: IEmbedTags[];

    @Prop({ default: [] })
    timestamps: ITimestamp[];

    @Prop({ default: [] })
    relatedTweets: string[];

    @Prop({ default: [] })
    relatedVideos: IRelatedVideo[];

    @Prop({ default: '' })
    uploader: string;

    @Prop({ enum: Object.values(VideoSource) })
    source: VideoSource;

    @Prop()
    mirror: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
