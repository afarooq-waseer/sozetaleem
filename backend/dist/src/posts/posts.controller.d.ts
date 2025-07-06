import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getAllPosts(page?: string, limit?: string): Promise<unknown[]>;
    getFeaturedPosts(limit?: string): Promise<unknown[]>;
    getRecentPosts(limit?: string): Promise<unknown[]>;
    getPopularPosts(limit?: string): Promise<unknown[]>;
    searchPosts(query: string, page?: string, limit?: string): Promise<unknown[] | {
        posts: never[];
        total: number;
    }>;
    getPostsByCategory(slug: string, page?: string, limit?: string): Promise<unknown[]>;
    getPostsByTag(slug: string, page?: string, limit?: string): Promise<unknown[]>;
    getPostsByAuthor(authorId: string, page?: string, limit?: string): Promise<unknown[]>;
    incrementViewCount(slug: string): Promise<{
        success: boolean;
    }>;
    getPostBySlug(slug: string): Promise<{}>;
}
