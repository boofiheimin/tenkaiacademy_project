import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Document } from 'mongoose';
import { YoutubeVideo } from 'src/base/youtube.service';
import { EmbedTag } from 'src/tags/schemas/tag.schema';

export class Timestamp {
    @IsNumber()
    @ApiProperty()
    timestamp: number;

    @IsString()
    @ApiProperty()
    description: string;
}

export class EmbedVideo {
    @IsString()
    @ApiProperty()
    videoId: string;

    @IsString()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    uploader: string;

    @IsString()
    @ApiProperty()
    thumbnail: string;

    @IsString()
    @ApiProperty()
    publishedAt: Date;

    @IsString()
    @ApiProperty()
    id: string;

    @IsBoolean()
    @ApiProperty()
    existing: boolean;

    constructor(video: VideoDocument | YoutubeVideo) {
        this.videoId = video.videoId;
        this.title = video.title;
        this.thumbnail = video.thumbnail;
        this.uploader = video.uploader;
        this.publishedAt = video.publishedAt;
        this.existing = (video as VideoDocument).id ? true : false;
        if ((video as VideoDocument).id) {
            this.id = (video as VideoDocument).id.toString();
        }
    }
}

export enum VideoSource {
    YOUTUBE_MANUAL = 'youtube-manual',
    MANUAL = 'manual',
    YOUTUBE = 'youtube',
}

export type VideoDocument = Video & Document;

@Schema({ timestamps: true })
export class Video {
    @Prop({ unique: true, required: [true, 'Please provide a videoIds'] })
    @ApiProperty({ description: "Youtube's videoId" })
    videoId: string;

    @Prop({ default: '' })
    title: string;

    @Prop({ default: '' })
    @ApiProperty()
    description: string;

    @Prop({ default: '' })
    @ApiProperty()
    thumbnail: string;

    @Prop({ default: 0 })
    @ApiProperty()
    duration: number;

    @Prop({ default: new Date() })
    @ApiProperty()
    publishedAt: Date;

    @Prop({ default: [] })
    @ApiProperty({ description: 'Embed Tag Metadata', type: [EmbedTag] })
    tags: EmbedTag[];

    @Prop({ default: [] })
    @ApiProperty({ type: [Timestamp] })
    timestamps: Timestamp[];

    @Prop({ default: [] })
    @ApiProperty({ description: "Tweets' ID" })
    relatedTweets: string[];

    @Prop({ default: [] })
    @ApiProperty({ description: 'Embed Video Metadata', type: [EmbedVideo] })
    relatedVideos: EmbedVideo[];

    @Prop({ default: '' })
    @ApiProperty()
    uploader: string;

    @Prop({ enum: Object.values(VideoSource) })
    @ApiProperty({ enum: VideoSource })
    source: VideoSource;

    @Prop({ default: '' })
    @ApiProperty({ description: 'Mirror Link incase original video got private' })
    mirror: string;

    @Prop({ required: true })
    @ApiProperty()
    isPrivate: boolean;

    constructor(videoId: string, source: VideoSource, youtubeVideo?: YoutubeVideo) {
        this.videoId = videoId;
        this.source = source;
        if (youtubeVideo) {
            const { title, thumbnail, uploader, duration, publishedAt } = youtubeVideo;
            this.title = title;
            this.thumbnail = thumbnail;
            this.uploader = uploader;
            this.duration = duration;
            this.publishedAt = publishedAt;
            this.isPrivate = false;
        } else {
            this.title = '';
            this.isPrivate = true;
        }
    }
}

export const VideoSchema = SchemaFactory.createForClass(Video);
