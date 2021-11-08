import { BaseFindInputDto } from 'src/base/dto/base-find.input.dto';
import { objectClassConstructor } from 'src/utils/utilities';

export class FindSongRecordsInputDto extends BaseFindInputDto {
    textSearch?: string;
    isScuffed?: boolean;
    dateSort?: 1 | -1;
    constructor(filter: object) {
        super();
        objectClassConstructor(this, filter, ['textSearch', 'isScuffed', 'dateSort', 'limit', 'skip']);
    }
}
