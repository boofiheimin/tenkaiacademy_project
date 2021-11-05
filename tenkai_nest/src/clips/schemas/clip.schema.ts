import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { Document } from 'mongoose';
import { YoutubeVideo } from 'src/base/youtube.service';
import { EmbedTag } from 'src/tags/schemas/tag.schema';
import { EmbedVideo } from 'src/videos/schemas/video.schema';

export enum ClipLang {
    EN = 'en',
    JP = 'jp',
    CN = 'cn',
}

export class EmbedClip {
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

    constructor(clip: ClipDocument | YoutubeVideo) {
        const { videoId, title, thumbnail, uploader, publishedAt } = clip;
        this.videoId = videoId;
        this.title = title;
        this.thumbnail = thumbnail;
        this.uploader = uploader;
        this.publishedAt = publishedAt;
        this.existing = (clip as ClipDocument).id ? true : false;
        if ((clip as ClipDocument).id) {
            this.id = (clip as ClipDocument).id.toString();
        }
    }
}

export type ClipDocument = Clip & Document;

@Schema({ timestamps: true })
export class Clip {
    @ApiProperty({ description: "youtube's videoId" })
    @Prop({ unique: true, required: [true, 'Please provide a videoIds'] })
    videoId: string;

    @ApiProperty({ description: "Embed source's video", type: [EmbedVideo] })
    @Prop()
    srcVideos: EmbedVideo[];

    @ApiProperty()
    @Prop({
        required: [true, 'Please provide a title'],
    })
    title: string;

    @ApiProperty()
    @Prop({
        default: '',
    })
    description: string;

    @ApiProperty()
    @Prop({
        thumbnail: '',
    })
    thumbnail: string;

    @ApiProperty()
    @Prop({
        default: 0,
    })
    duration: number;

    @ApiProperty()
    @Prop({
        default: new Date(),
    })
    publishedAt: Date;

    @ApiProperty({ description: 'Embed Tags Metadata', type: [EmbedTag] })
    @Prop({
        default: [],
    })
    tags: EmbedTag[];

    @ApiProperty()
    @Prop({
        default: '',
    })
    uploader: string;

    @ApiProperty({ description: 'Embed Clips Metadata', type: [EmbedClip] })
    @Prop({
        default: [],
    })
    relatedClips: EmbedClip[];

    @ApiProperty({ enum: ClipLang, enumName: 'ClipLang', isArray: true })
    @Prop({
        required: true,
        validate: [(value) => value.length > 0, `Please provide language ${Object.values(ClipLang).join(' | ')}`],
    })
    langs: ClipLang[];
}

export const ClipSchema = SchemaFactory.createForClass(Clip);
