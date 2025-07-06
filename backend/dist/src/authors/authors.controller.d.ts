import { AuthorsService } from './authors.service';
export declare class AuthorsController {
    private readonly authorsService;
    constructor(authorsService: AuthorsService);
    getAllAuthors(): Promise<unknown[]>;
    getAuthorById(id: string): Promise<{}>;
    getAuthorPosts(authorId: string, page?: string, limit?: string): Promise<{
        author: {};
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
