import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClipsService } from './clips.service';
import { CreateClipInputDto } from './dto/create-clip.input.dto';
import { FindClipsInputDto } from './dto/find-clips.input.dto';
import { FindClipsResponseDto } from './dto/find-clips.response.dto';
import { UpdateClipInputDto } from './dto/update-clip.input.dto';
import { Clip } from './schemas/clip.schema';

@Controller('clips')
export class ClipsController {
    constructor(private readonly clipsService: ClipsService) {}

    @Post()
    createClip(@Body() createClipInputDto: CreateClipInputDto): Promise<Clip> {
        return this.clipsService.createClip(createClipInputDto);
    }

    @Get()
    findClips(@Query() filter: FindClipsInputDto): Promise<FindClipsResponseDto> {
        return this.clipsService.findClips(filter);
    }

    @Get(':id')
    findClipById(@Param('id') id: string): Promise<Clip> {
        return this.clipsService.findClipById(id);
    }

    @Patch(':id')
    updateClip(@Param('id') id: string, @Body() updateClipInputDto: UpdateClipInputDto): Promise<Clip> {
        return this.clipsService.updateClip(id, updateClipInputDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<Clip> {
        return this.clipsService.deleteClip(id);
    }
}
