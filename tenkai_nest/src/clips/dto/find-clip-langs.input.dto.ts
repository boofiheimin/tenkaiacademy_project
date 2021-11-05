import { IsOptional, IsString, MaxLength } from 'class-validator';
import { BaseFindInputDto } from 'src/base/dto/base-find.input.dto';
import { filterClassConstructor } from 'src/utils/utilities';

export class FindClipLangsInputDto extends BaseFindInputDto {
    @IsString()
    @MaxLength(2)
    @IsOptional()
    code?: string;
    @IsString()
    @IsOptional()
    fullName?: string;
    constructor(filter: any) {
        super();
        filterClassConstructor(this, filter, ['code', 'fullName', 'sort', 'limit', 'skip']);
    }
}
