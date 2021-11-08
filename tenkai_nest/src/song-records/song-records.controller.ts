import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateSongRecordInputDto } from './dto/create-song-record.input.dto';
import { FindSongRecordsInputDto } from './dto/find-song-records.input.dto';
import { FindSongRecordsResponseDto } from './dto/find-song-records.response.dto';
import { UpdateSongRecordInputDto } from './dto/update-song-record.input.dto';
import { SongRecord } from './schemas/song-record.schema';
import { SongRecordsService } from './song-records.service';

@Controller('song-records')
export class SongRecordsController {
    constructor(private readonly songRecordsService: SongRecordsService) {}
    @Post()
    async createSongRecord(@Body() createSongRecordInputDto: CreateSongRecordInputDto): Promise<SongRecord> {
        return this.songRecordsService.createSongRecords(new CreateSongRecordInputDto(createSongRecordInputDto));
    }

    @Get()
    async findSongRecords(
        @Query() findSongRecordsInputDto: FindSongRecordsInputDto,
    ): Promise<FindSongRecordsResponseDto> {
        return this.songRecordsService.findSongRecords(new FindSongRecordsInputDto(findSongRecordsInputDto));
    }

    @Patch(':id')
    async updateSongRecord(@Param('id') id: string, @Body() updateSongRecordInputDto: UpdateSongRecordInputDto) {
        return this.songRecordsService.updateSongRecord(id, new UpdateSongRecordInputDto(updateSongRecordInputDto));
    }

    @Delete(':id')
    async deleteSongRecord(@Param('id') id: string) {
        return this.songRecordsService.deleteSongRecord(id);
    }
}
