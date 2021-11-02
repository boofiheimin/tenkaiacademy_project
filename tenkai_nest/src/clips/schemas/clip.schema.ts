import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
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
    relatedVideos: EmbedVideo[];

    @Prop({
        required: true,
        validate: [(value) => value.length > 0, `Please provide language ${Object.values(ClipLang).join(' | ')}`],
    })
    langs: ClipLang[];
}

export const ClipSchema = SchemaFactory.createForClass(Clip);
