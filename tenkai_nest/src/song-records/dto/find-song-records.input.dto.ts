import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';
import { BaseFindInputDto } from 'src/base/dto/base-find.input.dto';
import { objectClassConstructor } from 'src/utils/utilities';

export class FindSongRecordsInputDto extends BaseFindInputDto {
    @IsString()
    @IsOptional()
    textSearch?: string;

    @IsBoolean()
    @IsOptional()
    isScuffed?: boolean;

    @IsIn([1, -1])
    @IsOptional()
    dateSort?: 1 | -1;

    constructor(filter: object) {
        super();
        objectClassConstructor(this, filter, ['textSearch', 'isScuffed', 'dateSort', 'limit', 'skip']);
    }
}
