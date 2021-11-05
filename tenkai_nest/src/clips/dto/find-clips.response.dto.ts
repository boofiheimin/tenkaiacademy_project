import { ApiProperty } from '@nestjs/swagger';
import { BaseFindResponseDto } from 'src/base/dto/base-find.response.dto';
import { Clip, ClipDocument } from '../schemas/clip.schema';

export class FindClipsResponseDto extends BaseFindResponseDto<ClipDocument> {
    @ApiProperty({ type: Clip, isArray: true })
    docs: ClipDocument[];
}
