import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import BaseService from "src/base/base.service";
import { Tag } from "./tag.schema";

@Injectable()
export class TagsService extends BaseService<Tag> {
    constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {
        super(tagModel, new Logger(TagsService.name), {
            tagId: 1,
            catId: 1,
            tagNameEN: 1,
            tagNameJP: 1,
            isClip: 1,
        });
    }

    private async findLatestTag(): Promise<Tag> {
        const [latestTag] = await this.tagModel.find().sort({ tagId: -1 }).limit(1);
        return latestTag;
    }

    public async createTag(data: Partial<Tag>): Promise<Tag> {
        const latestTag = await this.findLatestTag();
        let index;
        if (!latestTag) {
            index = 1;
        } else {
            index = latestTag.tagId + 1;
        }
        return this.create({ ...data, tagId: index });
    }

    public async updateTag(id: string, data: Partial<Tag>): Promise<Tag> {
        const tag = await this.update(id, data);

        //TODO:: Add Video/Clip Cascade update

        return tag;
    }

    public async deleteTag(id: string): Promise<Tag> {
        const tag = await this.delete(id);

        //TODO:: Add Video/Clip Cascade update

        return tag;
    }
}
