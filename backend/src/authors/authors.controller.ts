import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { AuthorsService } from './authors.service';

@Controller('api/authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  async getAllAuthors() {
    return this.authorsService.getAllAuthors();
  }

  @Get(':id')
  async getAuthorById(@Param('id') id: string) {
    const author = await this.authorsService.getAuthorById(id);
    
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    
    return author;
  }

  @Get(':id/posts')
  async getAuthorPosts(
    @Param('id') authorId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10'
  ) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    
    try {
      return await this.authorsService.getAuthorPosts(authorId, pageNum, limitNum);
    } catch (error) {
      throw new NotFoundException('Author not found');
    }
  }
} 