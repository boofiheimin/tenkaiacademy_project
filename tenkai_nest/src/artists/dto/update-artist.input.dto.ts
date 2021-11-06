import { objectClassConstructor } from 'src/utils/utilities';

export class UpdateArtistInputDto {
    artistNameEN?: string;
    artistNameJP?: string;
    constructor(data: object) {
        objectClassConstructor(this, data, ['artistNameEN', 'artistNameJP']);
    }
}
