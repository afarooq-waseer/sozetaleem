import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    globalSearch(query: string, limit?: string): Promise<{
        posts: unknown[];
        categories: unknown[];
        tags: unknown[];
        total: number;
        query: string;
    } | {
        posts: never[];
        categories: never[];
        tags: never[];
        total: number;
    }>;
    getSearchSuggestions(query: string, limit?: string): Promise<{
        type: string;
        title: any;
        slug: any;
        url: string;
    }[]>;
}
