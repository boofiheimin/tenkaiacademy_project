import { IsOptional, IsString, MaxLength } from 'class-validator';
import { BaseFindInputDto } from 'src/base/dto/base-find.input.dto';
import { objectClassConstructor } from 'src/utils/utilities';

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
        objectClassConstructor(this, filter, ['code', 'fullName', 'sort', 'limit', 'skip']);
    }
}
