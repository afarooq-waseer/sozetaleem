import { CrudService } from '../database/crud.service';
export declare class PostsService {
    private readonly crudService;
    constructor(crudService: CrudService);
    getAllPosts(page?: number, limit?: number): Promise<unknown[]>;
    getPostBySlug(slug: string): Promise<unknown>;
    getFeaturedPosts(limit?: number): Promise<unknown[]>;
    getRecentPosts(limit?: number): Promise<unknown[]>;
    getPopularPosts(limit?: number): Promise<unknown[]>;
    searchPosts(query: string, page?: number, limit?: number): Promise<unknown[]>;
    getPostsByCategory(categorySlug: string, page?: number, limit?: number): Promise<unknown[]>;
    getPostsByTag(tagSlug: string, page?: number, limit?: number): Promise<unknown[]>;
    getPostsByAuthor(authorId: string, page?: number, limit?: number): Promise<unknown[]>;
    incrementViewCount(slug: string): Promise<unknown>;
}
