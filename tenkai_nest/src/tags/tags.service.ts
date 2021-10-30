import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import BaseService from "src/base/base.service";
import { Tag } from "./tag.schema";

@Injectable()
export class TagsService extends BaseService<Tag> {
    constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {
        super(tagModel, new Logger(TagsService.name));
    }
}
