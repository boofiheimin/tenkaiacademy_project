import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { objectClassConstructor } from 'src/utils/utilities';

export class UpdateClipLangInputDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    fullName?: string;
    constructor(data: any) {
        objectClassConstructor(this, data, ['fullName']);
    }
}
