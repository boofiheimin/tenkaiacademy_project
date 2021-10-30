import { Transform, Type } from "class-transformer";
import { IsNumber, IsObject, IsOptional } from "class-validator";

export class BaseFindParamsDto {
    @IsOptional()
    @IsNumber()
    limit?: number;

    @IsOptional()
    @IsNumber()
    skip?: number;

    @Type(() => String)
    @Transform(({ value }) => JSON.parse(value))
    @IsOptional()
    @IsObject()
    sort?: object;

    [key: string]: any;
}
