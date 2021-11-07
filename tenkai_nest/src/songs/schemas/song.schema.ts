import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { EmbedArtist } from 'src/artists/schemas/artist.schema';
import { objectClassConstructor } from 'src/utils/utilities';

export type SongDocument = Song & Document;

export class EmbedSong {
    @ApiProperty()
    songId: number;

    @ApiProperty()
    songNameEN: string;

    @ApiProperty()
    songNameJP: string;

    @ApiProperty({ type: [EmbedArtist] })
    artists: EmbedArtist[];

    constructor(song: Song) {
        objectClassConstructor(this, song, ['songId', 'songNameEN', 'songNameJP', 'artists']);
    }
}
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

    @ApiProperty()
    @Prop({ required: true })
    duration: number;
}

export const SongSchema = SchemaFactory.createForClass(Song);
