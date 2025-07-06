import { Controller, Get, Param, Query, Post, NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10'
  ) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    
    return this.postsService.getAllPosts(pageNum, limitNum);
  }

  @Get('featured')
  async getFeaturedPosts(@Query('limit') limit: string = '5') {
    const limitNum = parseInt(limit, 10);
    return this.postsService.getFeaturedPosts(limitNum);
  }

  @Get('recent')
  async getRecentPosts(@Query('limit') limit: string = '10') {
    const limitNum = parseInt(limit, 10);
    return this.postsService.getRecentPosts(limitNum);
  }

  @Get('popular')
  async getPopularPosts(@Query('limit') limit: string = '10') {
    const limitNum = parseInt(limit, 10);
    return this.postsService.getPopularPosts(limitNum);
  }

  @Get('search')
  async searchPosts(
    @Query('q') query: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10'
  ) {
    if (!query) {
      return { posts: [], total: 0 };
    }
    
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    
    return this.postsService.searchPosts(query, pageNum, limitNum);
  }

  @Get('category/:slug')
  async getPostsByCategory(
    @Param('slug') slug: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10'
  ) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    
    return this.postsService.getPostsByCategory(slug, pageNum, limitNum);
  }

  @Get('tag/:slug')
  async getPostsByTag(
    @Param('slug') slug: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10'
  ) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    
    return this.postsService.getPostsByTag(slug, pageNum, limitNum);
  }

  @Get('author/:id')
  async getPostsByAuthor(
    @Param('id') authorId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10'
  ) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    
    return this.postsService.getPostsByAuthor(authorId, pageNum, limitNum);
  }

  @Post(':slug/view')
  async incrementViewCount(@Param('slug') slug: string) {
    try {
      await this.postsService.incrementViewCount(slug);
      return { success: true };
    } catch (error) {
      throw new NotFoundException('Post not found');
    }
  }

  @Get(':slug')
  async getPostBySlug(@Param('slug') slug: string) {
    const post = await this.postsService.getPostBySlug(slug);
    
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    
    return post;
  }
} 