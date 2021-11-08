import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { EmbedSong } from 'src/songs/schemas/song.schema';

export type SongRecordDocument = SongRecord & Document;

export enum SongRecordType {
    COVER = 'COVER',
    ORIGINAL = 'ORIGINAL',
}

@Schema({ timestamps: true })
export class SongRecord {
    @ApiProperty()
    @Prop({ required: true })
    videoId: string;

    @ApiPropertyOptional()
    @Prop({ default: '' })
    proxyVideoId?: string;

    @ApiProperty()
    @Prop({ required: true })
    publishedAt: Date;

    @ApiProperty()
    @Prop({ required: true })
    song: EmbedSong;

    @ApiProperty()
    @Prop({ required: true })
    songStart: number;

    @ApiProperty()
    @Prop({ required: true })
    songEnd: number;

    @ApiProperty()
    @Prop({ required: true })
    songIndex: number;

    @ApiPropertyOptional()
    @Prop()
    featuring?: string;

    @ApiPropertyOptional({ enum: SongRecordType, description: 'For special song type' })
    @Prop()
    identifier?: SongRecordType;

    @ApiProperty()
    @Prop({ default: false })
    isScuffed: boolean;
}
const SongRecordSchema = SchemaFactory.createForClass(SongRecord);

export { SongRecordSchema };
