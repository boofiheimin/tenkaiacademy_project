import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class EmbedTag {
    @IsNumber()
    @ApiProperty()
    tagId: number;
    @IsString()
    @ApiProperty()
    tagNameEN: string;
    @IsString()
    @ApiProperty()
    tagNameJP: string;
    constructor(tag: Tag) {
        this.tagId = tag.tagId;
        this.tagNameEN = tag.tagNameEN;
        this.tagNameJP = tag.tagNameJP;
    }
}

export type TagDocument = Tag & Document;

@Schema({ timestamps: true })
export class Tag {
    @ApiProperty({ description: "Tag's numbered id" })
    @Prop({ unique: true, required: [true, 'Please provide a tagId'] })
    tagId: number;

    @ApiProperty({ description: "Tag's name in English" })
    @Prop({ unique: true, required: [true, 'Please provide a tagNameEN'] })
    tagNameEN: string;

    @ApiProperty({ description: "Tag's name in Japanese" })
    @Prop()
    tagNameJP: string;

    @ApiProperty({ description: 'tagId of parents Tag' })
    @Prop({ required: [true, 'Please provide a categoryId'], default: 0 })
    categoryId: number;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
