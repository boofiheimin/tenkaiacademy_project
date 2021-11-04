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

export type ClipDocument = Clip & Document;

@Schema({ timestamps: true })
export class Clip {
    @Prop({ unique: true, required: [true, 'Please provide a videoIds'] })
    videoId: string;

    @Prop()
    srcVideos: EmbedVideo[];

    @Prop({
        required: [true, 'Please provide a title'],
    })
    title: string;

    @Prop({
        default: '',
    })
    description: string;

    @Prop({
        thumbnail: '',
    })
    thumbnail: string;

    @Prop({
        default: 0,
    })
    duration: number;

    @Prop({
        default: new Date(),
    })
    publishedAt: Date;

    @Prop({
        default: [],
    })
    tags: EmbedTag[];

    @Prop({
        default: '',
    })
    uploader: string;

    @Prop({
        default: [],
    })
    relatedClips: EmbedClip[];

    @Prop({
        required: true,
        validate: [(value) => value.length > 0, `Please provide language ${Object.values(ClipLang).join(' | ')}`],
    })
    langs: ClipLang[];
}

export const ClipSchema = SchemaFactory.createForClass(Clip);

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
