import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArtistDocument = Artist & Document;

@Schema({ timestamps: true })
export class Artist {
    @Prop({ unique: true, required: true })
    artistId: number;
    @Prop({ unique: true, required: true })
    artistNameEN: string;
    @Prop()
    artistNameJP: string;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
