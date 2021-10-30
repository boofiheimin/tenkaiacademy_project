import { Transform, Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { BaseFindParamsDto } from "src/base/dto/base-find.params.dto";

export class FindTagParamsDto extends BaseFindParamsDto {
    @Type(() => String)
    @Transform(({ value }) => JSON.parse(value))
    @IsOptional()
    tagNameEN?: string | object;
    @Type(() => String)
    @Transform(({ value }) => JSON.parse(value))
    @IsOptional()
    tagNameJP?: string | object;
    @Type(() => String)
    @Transform(({ value }) => JSON.parse(value))
    @IsOptional()
    tagId?: number | object;
    @Type(() => String)
    @Transform(({ value }) => JSON.parse(value))
    @IsOptional()
    catId?: number | object;
}
