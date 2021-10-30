import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import BaseService from 'src/base/base.service';
import { Video } from './video.schema';

@Injectable()
export class VideosService extends BaseService<Video> {
    constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {
        super(videoModel, new Logger(VideosService.name));
    }
}
