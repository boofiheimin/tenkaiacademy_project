import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ClipLangDocument = ClipLang & Document;
@Schema({ timestamps: true })
export class ClipLang {
    @ApiProperty()
    @Prop({ unique: true, required: true })
    code: string;

    @ApiProperty()
    @Prop({ unique: true, required: true })
    fullName: string;
}

export const ClipLangSchema = SchemaFactory.createForClass(ClipLang);
