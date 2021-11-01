import { ApiProperty } from '@nestjs/swagger';
import { BaseFindResponseDto } from 'src/base/dto/base-find.response.dto';
import { Video } from '../schemas/video.schema';

export class FindVideosResponseDto extends BaseFindResponseDto<Video> {
    @ApiProperty({ type: Video, isArray: true })
    docs: Video[];
}
