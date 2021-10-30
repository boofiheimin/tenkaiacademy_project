import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { BaseFindResponseDto } from "src/base/dto/base-find.response.dto";

import { UserRole } from "src/users/user.schema";
import { CreateTagParamsDto } from "./dto/create-tag.params.dto";
import { FindTagParamsDto } from "./dto/find-tags.params.dto";
import { UpdateTagParamsDto } from "./dto/update-tag.params.dto";
import { Tag } from "./tag.schema";

import { TagsService } from "./tags.service";

@ApiTags("Tags")
@Controller("tags")
export class TagsController {
    constructor(private tagService: TagsService) {}
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async createTag(@Body() createTagParamsDto: CreateTagParamsDto): Promise<Tag> {
        return this.tagService.createTag(createTagParamsDto);
    }

    @Get()
    async findTags(@Query() filter: FindTagParamsDto): Promise<BaseFindResponseDto<Tag>> {
        return this.tagService.find(filter);
    }

    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(":id")
    async updateTag(@Param("id") id: string, @Body() updateTagParamsDto: UpdateTagParamsDto): Promise<Tag> {
        return this.tagService.updateTag(id, updateTagParamsDto);
    }

    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(":id")
    async deleteTag(@Param("id") id: string): Promise<Tag> {
        return this.tagService.deleteTag(id);
    }
}
