import { objectClassConstructor } from 'src/utils/utilities';

export class CreateArtistInputDto {
    artistNameEN: string;
    artistNameJP: string;
    constructor(data: object) {
        objectClassConstructor(this, data, ['artistNameEN', 'artistNameJP']);
    }
}
