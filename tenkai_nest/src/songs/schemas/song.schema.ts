import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { EmbedArtist } from 'src/artists/schemas/artist.schema';
import { objectClassConstructor } from 'src/utils/utilities';

export type SongDocument = Song & Document;

export class EmbedSong {
    @ApiProperty()
    songId: number;

    @ApiProperty({ description: 'Song name in English' })
    songNameEN: string;

    @ApiProperty({ description: 'Song name in Romanji' })
    songNameRM: string;

    @ApiProperty({ description: 'Song name in Japanese' })
    songNameJP: string;

    @ApiProperty({ type: [EmbedArtist] })
    artists: EmbedArtist[];

    constructor(song: Song) {
        objectClassConstructor(this, song, ['songId', 'songNameEN', 'songNameJP', 'songNameRM', 'artists']);
    }
}
@Schema({ timestamps: true })
export class Song {
    @ApiProperty()
    @Prop({ unique: true, required: true })
    songId: number;

    @ApiProperty({ description: 'Song name in English' })
    @Prop({
        required: [
            function () {
                return !this.songNameEN;
            },
            'Need either Romanji or English name',
        ],
        default: '',
    })
    songNameRM: string;

    @ApiProperty({ description: 'Song name in Romanji' })
    @Prop({
        required: [
            function () {
                return !this.songNameRM;
            },
            'Need either Romanji or English name',
        ],
        default: '',
    })
    songNameEN: string;

    @ApiProperty({ description: 'Song name in Japanese' })
    @Prop({ default: '' })
    songNameJP: string;

    @ApiProperty({ type: [EmbedArtist] })
    @Prop({ required: true })
    artists: EmbedArtist[];

    @ApiProperty()
    @Prop({ required: true })
    duration: number;
}

export const SongSchema = SchemaFactory.createForClass(Song);
