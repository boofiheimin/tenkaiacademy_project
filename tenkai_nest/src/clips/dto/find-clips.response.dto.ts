import { ApiProperty } from '@nestjs/swagger';
import { BaseFindResponseDto } from 'src/base/dto/base-find.response.dto';
import { Clip } from '../schemas/clip.schema';

export class FindClipsResponseDto extends BaseFindResponseDto<Clip> {
    @ApiProperty({ type: Clip, isArray: true })
    docs: Clip[];
}
