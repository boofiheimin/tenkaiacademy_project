import { Tag } from 'src/tags/schemas/tag.schema';

export const tagStub = (): Tag => ({
    tagId: 1,
    tagNameEN: 'testTag',
    tagNameJP: '',
    isClip: false,
    catId: 0,
});
