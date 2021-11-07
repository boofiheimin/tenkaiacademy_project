import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateSongRecordInputDto } from './dto/create-song-record.input.dto';
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
    async findSongRecords() {}

    @Patch(':id')
    async updateSongRecord() {}

    @Delete(':id')
    async deleteSongRecord() {}
}
