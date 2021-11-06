import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { EmbedArtist } from 'src/artists/schemas/artist.schema';

export type SongDocument = Song & Document;

@Schema({ timestamps: true })
export class Song {
    @ApiProperty()
    @Prop({ unique: true, required: true })
    songId: number;

    @ApiProperty()
    @Prop({ required: true })
    songNameEN: string;

    @ApiProperty()
    @Prop()
    songNameJP: string;

    @ApiProperty({ type: [EmbedArtist] })
    @Prop({ required: true })
    artists: EmbedArtist[];
}

export const SongSchema = SchemaFactory.createForClass(Song);
