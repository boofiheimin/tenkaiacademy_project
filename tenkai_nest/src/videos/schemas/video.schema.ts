import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Document } from 'mongoose';
import { YoutubeVideo } from 'src/base/youtube.service';
import { EmbedTags } from 'src/tags/schemas/tag.schema';

export class ITimestamp {
    @IsNumber()
    @ApiProperty()
    timestamp: number;

    @IsString()
    @ApiProperty()
    description: string;
}

export class RelatedVideo {
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

    @Prop({ required: [true, 'Please provide a title'] })
    title: string;

    @Prop()
    @ApiProperty()
    description: string;

    @Prop()
    @ApiProperty()
    thumbnail: string;

    @Prop({ default: 0 })
    @ApiProperty()
    duration: number;

    @Prop({ default: new Date() })
    @ApiProperty()
    publishedAt: Date;

    @Prop({ default: [] })
    @ApiProperty({ description: 'Embed Tag Metadata' })
    tags: EmbedTags[];

    @Prop({ default: [] })
    @ApiProperty()
    timestamps: ITimestamp[];

    @Prop({ default: [] })
    @ApiProperty()
    relatedTweets: string[];

    @Prop({ default: [] })
    @ApiProperty()
    relatedVideos: RelatedVideo[];

    @Prop({ default: '' })
    @ApiProperty()
    uploader: string;

    @Prop({ enum: Object.values(VideoSource) })
    @ApiProperty()
    source: VideoSource;

    @Prop({ default: '' })
    @ApiProperty()
    @ApiProperty({ description: 'Mirror Link incase original video got private' })
    mirror: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
