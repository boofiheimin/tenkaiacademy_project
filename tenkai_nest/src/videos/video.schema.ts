import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Document } from 'mongoose';
import { IEmbedTags } from 'src/tags/tag.schema';

export class ITimestamp {
    @IsNumber()
    @ApiProperty()
    timestamp: number;

    @IsString()
    @ApiProperty()
    description: string;
}

export class IRelatedVideo {
    @IsString()
    @ApiProperty()
    videoId: string;

    @IsBoolean()
    @ApiProperty()
    existing: boolean;

    @IsString()
    @ApiProperty()
    uploader: string;

    @IsString()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    thumbnail: string;

    @IsString()
    @ApiProperty()
    publishedAt: Date;

    @IsString()
    @ApiProperty()
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
    tags: IEmbedTags[];

    @Prop({ default: [] })
    @ApiProperty()
    timestamps: ITimestamp[];

    @Prop({ default: [] })
    @ApiProperty()
    relatedTweets: string[];

    @Prop({ default: [] })
    @ApiProperty()
    relatedVideos: IRelatedVideo[];

    @Prop({ default: '' })
    @ApiProperty()
    uploader: string;

    @Prop({ enum: Object.values(VideoSource) })
    @ApiProperty()
    source: VideoSource;

    @Prop()
    @ApiProperty()
    @ApiProperty({ description: 'Mirror Link incase original video got private' })
    mirror: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
