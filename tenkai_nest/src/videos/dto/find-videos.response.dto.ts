import { BaseFindResponseDto } from 'src/base/dto/base-find.response.dto';
import { Video } from '../video.schema';

export class FindVideosResponseDto extends BaseFindResponseDto<Video> {
    docs: Video[];
}
