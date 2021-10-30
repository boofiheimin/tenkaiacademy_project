import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTagParamsDto {
    @IsString()
    @ApiProperty()
    tagNameEN: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    tagNameJP?: string;

    @IsNumber()
    @ApiProperty()
    catId: number;

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional({ default: false })
    isClip: boolean;
}
