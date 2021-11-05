import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/users/schemas/user.schema';

import { CreateTagInputDto } from './dto/create-tag.input.dto';
import { FindTagsInputDto } from './dto/find-tags.input.dto';
import { FindTagsResponseDto } from './dto/find-tags.response.dto';
import { UpdateTagInputDto } from './dto/update-tag.input.dto';

import { Tag } from './schemas/tag.schema';
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
    async createTag(@Body() createTagInputDto: CreateTagInputDto): Promise<Tag> {
        return this.tagService.createTag(createTagInputDto);
    }

    @Get()
    @ApiOperation({ summary: 'Find Tags' })
    @ApiResponse({ type: FindTagsResponseDto })
    async findTags(@Query() findTagsInputDto: FindTagsInputDto): Promise<FindTagsResponseDto> {
        return this.tagService.findTags(new FindTagsInputDto(findTagsInputDto));
    }

    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update Tag' })
    @ApiResponse({ type: Tag })
    async updateTag(@Param('id') id: string, @Body() updateTagInputDto: UpdateTagInputDto): Promise<Tag> {
        return this.tagService.updateTag(id, updateTagInputDto);
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
