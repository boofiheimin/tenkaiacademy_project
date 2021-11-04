import { ClipLang } from '../schemas/clip.schema';

export class UpdateClipInputDto {
    srcVideoIds?: string[];
    langs?: ClipLang[];
    title?: string;
    description?: string;
    thumbnail?: string;
    duration?: number;
    publishedAt?: Date;
    uploader?: string;
    tagIds?: number[];
    relatedVideoIds?: string[];
}
