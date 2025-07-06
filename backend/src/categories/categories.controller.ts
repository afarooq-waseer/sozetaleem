import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get('tree')
  async getCategoryTree() {
    return this.categoriesService.getCategoryTree();
  }

  @Get(':slug')
  async getCategoryBySlug(@Param('slug') slug: string) {
    const category = await this.categoriesService.getCategoryBySlug(slug);
    
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    
    return category;
  }

  @Get(':slug/posts')
  async getPostsByCategory(
    @Param('slug') slug: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10'
  ) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    
    try {
      return await this.categoriesService.getPostsByCategory(slug, pageNum, limitNum);
    } catch (error) {
      throw new NotFoundException('Category not found');
    }
  }
} 