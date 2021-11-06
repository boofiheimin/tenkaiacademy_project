import { BaseFindInputDto } from 'src/base/dto/base-find.input.dto';
import { objectClassConstructor } from 'src/utils/utilities';

export class FindArtistsInputDto extends BaseFindInputDto {
    artistId?: string;
    artistNameEN?: string;
    artistNameJP?: string;
    constructor(filter: object) {
        super();
        objectClassConstructor(this, filter, ['artistId', 'artistNameEN', 'artistNameJP', 'limit', 'skip', 'sort']);
    }
}
