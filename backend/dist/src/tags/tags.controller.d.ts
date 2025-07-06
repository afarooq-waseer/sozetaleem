import { TagsService } from './tags.service';
export declare class TagsController {
    private readonly tagsService;
    constructor(tagsService: TagsService);
    getAllTags(): Promise<unknown[]>;
    getPopularTags(limit?: string): Promise<any[]>;
    getTagBySlug(slug: string): Promise<{}>;
    getPostsByTag(slug: string, page?: string, limit?: string): Promise<{
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
}
