import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async globalSearch(
    @Query('q') query: string,
    @Query('limit') limit: string = '10'
  ) {
    if (!query) {
      return {
        posts: [],
        categories: [],
        tags: [],
        total: 0
      };
    }

    const limitNum = parseInt(limit, 10);
    return this.searchService.globalSearch(query, limitNum);
  }

  @Get('suggestions')
  async getSearchSuggestions(
    @Query('q') query: string,
    @Query('limit') limit: string = '5'
  ) {
    if (!query) {
      return [];
    }

    const limitNum = parseInt(limit, 10);
    return this.searchService.getSearchSuggestions(query, limitNum);
  }
} 