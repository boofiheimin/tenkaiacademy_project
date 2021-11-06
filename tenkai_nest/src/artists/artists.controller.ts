import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/users/schemas/user.schema';
import { ArtistsService } from './artists.service';
import { CreateArtistInputDto } from './dto/create-artist.input.dto';
import { FindArtistsInputDto } from './dto/find-artists.input.dto';
import { FindArtistsResponseDto } from './dto/find-artists.response.dto';
import { UpdateArtistInputDto } from './dto/update-artist.input.dto';
import { Artist } from './schemas/artist.schema';

@Controller('artists')
export class ArtistsController {
    constructor(private readonly artistsService: ArtistsService) {}
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async createArtist(@Body() createArtistInputDto: CreateArtistInputDto): Promise<Artist> {
        return this.artistsService.createArtist(new CreateArtistInputDto(createArtistInputDto));
    }

    @Get()
    async findArtists(@Query() findArtistsInputDto: FindArtistsInputDto): Promise<FindArtistsResponseDto> {
        return this.artistsService.findArtists(findArtistsInputDto);
    }

    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id')
    async updateArtist(@Param('id') id: string, @Body() updateArtistInputDto: UpdateArtistInputDto): Promise<Artist> {
        return this.artistsService.updateArtist(id, new UpdateArtistInputDto(updateArtistInputDto));
    }

    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async deleteArtist(@Param('id') id: string): Promise<Artist> {
        return this.artistsService.deleteArtist(id);
    }
}
