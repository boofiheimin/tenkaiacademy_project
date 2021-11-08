import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';
import { BaseFindInputDto } from 'src/base/dto/base-find.input.dto';
import { objectClassConstructor } from 'src/utils/utilities';

export class FindSongRecordsInputDto extends BaseFindInputDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    textSearch?: string;

    @Type(() => String)
    @Transform(({ value }) => {
        if (value === 'false' || !value) {
            return false;
        } else {
            return true;
        }
    })
    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional()
    isScuffed?: boolean;

    @IsIn([1, -1])
    @IsOptional()
    @ApiPropertyOptional({ enum: [1, -1] })
    dateSort?: 1 | -1;

    constructor(filter: object) {
        super();
        objectClassConstructor(this, filter, ['textSearch', 'isScuffed', 'dateSort', 'limit', 'skip']);
    }
}
