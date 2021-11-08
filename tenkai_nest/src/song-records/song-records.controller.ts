import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/users/schemas/user.schema';
import { CreateSongRecordInputDto } from './dto/create-song-record.input.dto';
import { FindSongRecordsInputDto } from './dto/find-song-records.input.dto';
import { FindSongRecordsResponseDto } from './dto/find-song-records.response.dto';
import { UpdateSongRecordInputDto } from './dto/update-song-record.input.dto';
import { SongRecord } from './schemas/song-record.schema';
import { SongRecordsService } from './song-records.service';
@ApiTags('Song Records')
@Controller('song-records')
export class SongRecordsController {
    constructor(private readonly songRecordsService: SongRecordsService) {}

    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create Song Record' })
    @ApiResponse({ type: SongRecord })
    async createSongRecord(@Body() createSongRecordInputDto: CreateSongRecordInputDto): Promise<SongRecord> {
        return this.songRecordsService.createSongRecords(new CreateSongRecordInputDto(createSongRecordInputDto));
    }

    @Get()
    @ApiOperation({ summary: 'Find Song Records' })
    @ApiResponse({ type: FindSongRecordsResponseDto })
    async findSongRecords(
        @Query() findSongRecordsInputDto: FindSongRecordsInputDto,
    ): Promise<FindSongRecordsResponseDto> {
        return this.songRecordsService.findSongRecords(new FindSongRecordsInputDto(findSongRecordsInputDto));
    }

    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Edit Song Record' })
    @ApiResponse({ type: SongRecord })
    async updateSongRecord(@Param('id') id: string, @Body() updateSongRecordInputDto: UpdateSongRecordInputDto) {
        return this.songRecordsService.updateSongRecord(id, new UpdateSongRecordInputDto(updateSongRecordInputDto));
    }

    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete Song Record' })
    @ApiResponse({ type: SongRecord })
    async deleteSongRecord(@Param('id') id: string) {
        return this.songRecordsService.deleteSongRecord(id);
    }
}
