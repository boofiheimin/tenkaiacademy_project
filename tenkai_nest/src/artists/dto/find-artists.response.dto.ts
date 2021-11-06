import { BaseFindResponseDto } from 'src/base/dto/base-find.response.dto';
import { Artist } from '../schemas/artist.schema';

export class FindArtistsResponseDto extends BaseFindResponseDto<Artist> {
    docs: Artist[];
}
