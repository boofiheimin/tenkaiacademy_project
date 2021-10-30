import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateVideoParamsDto } from './dto/create-video.params.dto';
import { FindVideosParamsDto } from './dto/find-videos.params.dto';
import { FindVideosResponseDto } from './dto/find-videos.response.dto';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/users/user.schema';

import { Video } from './video.schema';
import { VideosService } from './videos.service';
import { UpdateVideoParamsDto } from './dto/update-video.params.dto';

@Controller('videos')
export class VideosController {
    constructor(private videoService: VideosService) {}
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async createVideo(@Body() createVideoParamsDto: CreateVideoParamsDto): Promise<Video> {
        return this.videoService.createVideo(createVideoParamsDto.videoId);
    }

    @Get()
    async findVideos(@Query() filter: FindVideosParamsDto): Promise<FindVideosResponseDto> {
        return this.videoService.findVideos(filter);
    }

    @Get(':id')
    async findVideoById(@Param('id') id: string): Promise<Video> {
        return this.videoService.findVideoById(id);
    }
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id')
    async updateVideo(@Param('id') id: string, @Body() updateVideoParamsDto: UpdateVideoParamsDto): Promise<Video> {
        return this.videoService.updateVideo(id, updateVideoParamsDto);
    }
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async deleteVideo(@Param('id') id: string): Promise<Video> {
        return this.videoService.deleteVideo(id);
    }
}
