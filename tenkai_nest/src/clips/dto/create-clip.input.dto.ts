import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { objectClassConstructor } from 'src/utils/utilities';

export class CreateClipInputDto {
    @ApiProperty()
    @IsString()
    videoId: string;
    @ApiProperty({ type: [String] })
    @IsString({ each: true })
    srcVideoIds: string[];
    @IsString({ each: true })
    @ApiProperty({ type: [String] })
    langs: string[];
    constructor(data: object) {
        objectClassConstructor(this, data, ['videoId', 'srcVideoIds', 'langs']);
    }
}
