import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

import { UserRole } from 'src/users/user.schema';
import { CreateTagParamsDto } from './dto/create-tag.params.dto';
import { FindTagParamsDto } from './dto/find-tags.params.dto';
import { FindTagsResponseDto } from './dto/find-tags.response.dto';
import { UpdateTagParamsDto } from './dto/update-tag.params.dto';
import { Tag } from './tag.schema';

import { TagsService } from './tags.service';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
    constructor(private tagService: TagsService) {}
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create Tag' })
    @ApiResponse({ type: Tag })
    async createTag(@Body() createTagParamsDto: CreateTagParamsDto): Promise<Tag> {
        return this.tagService.createTag(createTagParamsDto);
    }

    @Get()
    @ApiOperation({ summary: 'Find Tags' })
    @ApiResponse({ type: FindTagsResponseDto })
    async findTags(@Query() filter: FindTagParamsDto): Promise<FindTagsResponseDto> {
        return this.tagService.find(filter);
    }

    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update Tag' })
    @ApiResponse({ type: Tag })
    async updateTag(@Param('id') id: string, @Body() updateTagParamsDto: UpdateTagParamsDto): Promise<Tag> {
        return this.tagService.updateTag(id, updateTagParamsDto);
    }

    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete Tag' })
    @ApiResponse({ type: Tag })
    async deleteTag(@Param('id') id: string): Promise<Tag> {
        return this.tagService.deleteTag(id);
    }
}
