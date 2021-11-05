import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/users/schemas/user.schema';
import { ClipsService } from './clips.service';
import { CreateClipInputDto } from './dto/create-clip.input.dto';
import { FindClipsInputDto } from './dto/find-clips.input.dto';
import { FindClipsResponseDto } from './dto/find-clips.response.dto';
import { UpdateClipInputDto } from './dto/update-clip.input.dto';
import { Clip } from './schemas/clip.schema';
@ApiTags('Clips')
@Controller('clips')
export class ClipsController {
    constructor(private readonly clipsService: ClipsService) {}
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create Clip' })
    @ApiResponse({ type: Clip })
    createClip(@Body() createClipInputDto: CreateClipInputDto): Promise<Clip> {
        return this.clipsService.createClip(createClipInputDto);
    }

    @Get()
    @ApiOperation({ summary: 'Find Clips' })
    @ApiResponse({ type: FindClipsResponseDto })
    findClips(@Query() filter: FindClipsInputDto): Promise<FindClipsResponseDto> {
        return this.clipsService.findClips(new FindClipsInputDto(filter));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find Clip by Id' })
    @ApiResponse({ type: Clip })
    findClipById(@Param('id') id: string): Promise<Clip> {
        return this.clipsService.findClipById(id);
    }
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update Clip' })
    @ApiResponse({ type: Clip })
    updateClip(@Param('id') id: string, @Body() updateClipInputDto: UpdateClipInputDto): Promise<Clip> {
        return this.clipsService.updateClip(id, updateClipInputDto);
    }
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete Clip' })
    @ApiResponse({ type: Clip })
    delete(@Param('id') id: string): Promise<Clip> {
        return this.clipsService.deleteClip(id);
    }
}
