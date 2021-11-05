import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/users/schemas/user.schema';
import { ClipsService } from './clips.service';
import { CreateClipLangInputDto } from './dto/create-clip-lang.input.dto';
import { CreateClipInputDto } from './dto/create-clip.input.dto';
import { FindClipLangsInputDto } from './dto/find-clip-langs.input.dto';
import { FindClipLangsResponseDto } from './dto/find-clip-langs.response';
import { FindClipsInputDto } from './dto/find-clips.input.dto';
import { FindClipsResponseDto } from './dto/find-clips.response.dto';
import { UpdateClipLangInputDto } from './dto/update-clip-lang.input.dto';
import { UpdateClipInputDto } from './dto/update-clip.input.dto';
import { ClipLang } from './schemas/clip-lang.schema';
import { Clip } from './schemas/clip.schema';
@ApiTags('Clips')
@Controller('clips')
export class ClipsController {
    constructor(private readonly clipsService: ClipsService) {}

    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('clipLangs')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create Clip Language' })
    @ApiResponse({ type: ClipLang })
    createClipLang(@Body() createClipLangInputDto: CreateClipLangInputDto): Promise<ClipLang> {
        return this.clipsService.createClipLang(createClipLangInputDto);
    }

    @Get('clipLangs')
    @ApiOperation({ summary: 'Find Clip Languages' })
    @ApiResponse({ type: FindClipLangsResponseDto })
    findClipLangs(@Query() filter: FindClipLangsInputDto): Promise<FindClipLangsResponseDto> {
        return this.clipsService.findClipLangs(new FindClipLangsInputDto(filter));
    }

    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('clipLangs/:id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update Clip Language' })
    @ApiResponse({ type: ClipLang })
    updateClipLang(@Param('id') id: string, @Body() updateClipLangInputDto: UpdateClipLangInputDto): Promise<ClipLang> {
        return this.clipsService.updateClipLang(id, updateClipLangInputDto);
    }

    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('clipLangs/:id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete Clip Language' })
    @ApiResponse({ type: ClipLang })
    deleteClipLang(@Param('id') id: string): Promise<ClipLang> {
        return this.clipsService.deleteClipLang(id);
    }

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
