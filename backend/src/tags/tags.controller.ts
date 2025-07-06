import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('api/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async getAllTags() {
    return this.tagsService.getAllTags();
  }

  @Get('popular')
  async getPopularTags(@Query('limit') limit: string = '20') {
    const limitNum = parseInt(limit, 10);
    return this.tagsService.getPopularTags(limitNum);
  }

  @Get(':slug')
  async getTagBySlug(@Param('slug') slug: string) {
    const tag = await this.tagsService.getTagBySlug(slug);
    
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    
    return tag;
  }

  @Get(':slug/posts')
  async getPostsByTag(
    @Param('slug') slug: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10'
  ) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    
    try {
      return await this.tagsService.getPostsByTag(slug, pageNum, limitNum);
    } catch (error) {
      throw new NotFoundException('Tag not found');
    }
  }
} 