import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ArtistDocument = Artist & Document;

@Schema({ timestamps: true })
export class Artist {
    @ApiProperty()
    @Prop({ unique: true, required: true })
    artistId: number;
    @ApiProperty()
    @Prop({ unique: true, required: true })
    artistNameEN: string;
    @ApiProperty()
    @Prop()
    artistNameJP: string;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
