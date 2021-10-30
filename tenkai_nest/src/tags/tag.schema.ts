import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class Tag extends Document {
    @ApiProperty({ description: "Tag's numbered id" })
    @Prop({ unique: true, required: [true, "Please provide a tagId"] })
    tagId: number;

    @ApiProperty({ description: "Tag's name in English" })
    @Prop({ unique: true, required: [true, "Please provide a tagNameEN"] })
    tagNameEN: string;

    @ApiProperty({ description: "Tag's name in Japanese" })
    @Prop()
    tagNameJP: string;

    @ApiProperty({ description: "tagId of parents Tag" })
    @Prop({ required: [true, "Please provide a catId"], default: 0 })
    catId: number; //TODO: change this to categoryId

    @ApiProperty({ description: "Determine Clip-only Tag" })
    @Prop()
    isClip: boolean;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
