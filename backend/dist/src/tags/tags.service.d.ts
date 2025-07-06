import { CrudService } from '../database/crud.service';
export declare class TagsService {
    private readonly crudService;
    constructor(crudService: CrudService);
    getAllTags(): Promise<unknown[]>;
    getTagBySlug(slug: string): Promise<unknown>;
    getPostsByTag(tagSlug: string, page?: number, limit?: number): Promise<{
        tag: {};
        posts: unknown[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    getPopularTags(limit?: number): Promise<any[]>;
}
