import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { objectClassConstructor } from 'src/utils/utilities';

export type ArtistDocument = Artist & Document;

export class EmbedArtist {
    @ApiProperty()
    artistId: number;
    @ApiProperty()
    artistNameEN: string;
    @ApiProperty()
    artistNameJP: string;
    constructor(artist: Artist) {
        objectClassConstructor(this, artist, ['artistId', 'artistNameEN', 'artistNameJP']);
    }
}

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
