import { ClipLang } from '../schemas/clip.schema';

export class CreateClipInputDto {
    videoId: string;
    srcVideoIds: string[];
    langs: ClipLang[];
}
