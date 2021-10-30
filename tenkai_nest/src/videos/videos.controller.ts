import { Controller, Get, Query } from '@nestjs/common';
import { FindVideosParamsDto } from './dto/find-videos.params.dto';
import { FindVideosResponseDto } from './dto/find-videos.response.dto';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
    constructor(private videoService: VideosService) {}
    @Get()
    async findVideos(@Query() filter: FindVideosParamsDto): Promise<FindVideosResponseDto> {
        return this.videoService.findVideos(filter);
    }
}
