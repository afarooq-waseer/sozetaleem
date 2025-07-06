import { CrudService } from '../database/crud.service';
export declare class SearchService {
    private readonly crudService;
    constructor(crudService: CrudService);
    globalSearch(query: string, limit?: number): Promise<{
        posts: never[];
        categories: never[];
        tags: never[];
        total: number;
        query?: undefined;
    } | {
        posts: unknown[];
        categories: unknown[];
        tags: unknown[];
        total: number;
        query: string;
    }>;
    getSearchSuggestions(query: string, limit?: number): Promise<{
        type: string;
        title: any;
        slug: any;
        url: string;
    }[]>;
}
