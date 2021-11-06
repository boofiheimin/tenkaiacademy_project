import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/users/schemas/user.schema';
import { SongsService } from './songs.service';
import { CreateSongInputDto } from './dto/create-song.input.dto';
import { FindSongsInputDto } from './dto/find-songs.input.dto';
import { FindSongsResponseDto } from './dto/find-songs.response.dto';
import { UpdateSongInputDto } from './dto/update-song.input.dto';
import { Song } from './schemas/song.schema';
@ApiTags('Songs')
@Controller('songs')
export class SongsController {
    constructor(private readonly songsService: SongsService) {}
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create Song' })
    @ApiResponse({ type: Song })
    async createSong(@Body() createSongInputDto: CreateSongInputDto): Promise<Song> {
        return this.songsService.createSong(new CreateSongInputDto(createSongInputDto));
    }

    @Get()
    @ApiOperation({ summary: 'Find Songs' })
    @ApiResponse({ type: FindSongsResponseDto })
    async findSongs(@Query() findSongsInputDto: FindSongsInputDto): Promise<FindSongsResponseDto> {
        return this.songsService.findSongs(findSongsInputDto);
    }

    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update Song' })
    @ApiResponse({ type: Song })
    async updateSong(@Param('id') id: string, @Body() updateSongInputDto: UpdateSongInputDto): Promise<Song> {
        return this.songsService.updateSong(id, new UpdateSongInputDto(updateSongInputDto));
    }

    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete Song' })
    @ApiResponse({ type: Song })
    async deleteSong(@Param('id') id: string): Promise<Song> {
        return this.songsService.deleteSong(id);
    }
}
