import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { objectClassConstructor } from 'src/utils/utilities';

export class CreateClipLangInputDto {
    @MaxLength(2)
    @IsString()
    @ApiProperty()
    code: string;
    @IsString()
    @ApiProperty()
    fullName: string;
    constructor(data: object) {
        objectClassConstructor(this, data, ['code', 'fullName']);
    }
}
