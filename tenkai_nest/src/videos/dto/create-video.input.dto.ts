import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { objectClassConstructor } from 'src/utils/utilities';

export class CreateVideoInputDto {
    @IsString()
    @ApiProperty()
    videoId: string;
    constructor(data: object) {
        objectClassConstructor(this, data, ['videoId']);
    }
}
