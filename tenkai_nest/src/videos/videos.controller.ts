import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateVideoInputDto } from './dto/create-video.input.dto';
import { FindVideosInputDto } from './dto/find-videos.input.dto';
import { FindVideosResponseDto } from './dto/find-videos.response.dto';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/users/schemas/user.schema';

import { Video } from './schemas/video.schema';
import { VideosService } from './videos.service';
import { UpdateVideoInputDto } from './dto/update-video.input.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Videos')
@Controller('videos')
export class VideosController {
    constructor(private videoService: VideosService) {}
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create Video' })
    @ApiResponse({ type: Video })
    async createVideo(@Body() CreateVideoInputDto: CreateVideoInputDto): Promise<Video> {
        return this.videoService.createVideo(CreateVideoInputDto.videoId);
    }

    @Get()
    @ApiOperation({ summary: 'Find Videos' })
    @ApiResponse({ type: FindVideosResponseDto })
    async findVideos(@Query() filter: FindVideosInputDto): Promise<FindVideosResponseDto> {
        return this.videoService.findVideos(filter);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find Video by Id' })
    @ApiResponse({ type: Video })
    async findVideoById(@Param('id') id: string): Promise<Video> {
        return this.videoService.findVideoById(id);
    }
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update Video' })
    @ApiResponse({ type: Video })
    async updateVideo(@Param('id') id: string, @Body() updateVideoInputDto: UpdateVideoInputDto): Promise<Video> {
        return this.videoService.updateVideo(id, updateVideoInputDto);
    }
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete Video' })
    @ApiResponse({ type: Video })
    async deleteVideo(@Param('id') id: string): Promise<Video> {
        return this.videoService.deleteVideo(id);
    }
}
