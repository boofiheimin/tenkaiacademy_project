import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTagParamsDto {
    @IsString()
    tagNameEN: string;

    @IsOptional()
    @IsString()
    tagNameJP?: string;

    @IsNumber()
    catId: number;
}
