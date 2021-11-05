import { Transform, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { BaseFindInputDto } from 'src/base/dto/base-find.input.dto';
import { objectClassConstructor } from 'src/utils/utilities';

export class FindTagsInputDto extends BaseFindInputDto {
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
    categoryId?: number | object;
    constructor(filter: any = {}) {
        super();
        objectClassConstructor(this, filter, [
            'tagNameEN',
            'tagNameJP',
            'tagId',
            'categoryId',
            'limit',
            'skip',
            'sort',
        ]);
    }
}
