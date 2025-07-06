import { CrudService } from '../database/crud.service';
export declare class AuthorsService {
    private readonly crudService;
    constructor(crudService: CrudService);
    getAllAuthors(): Promise<unknown[]>;
    getAuthorById(id: string): Promise<unknown>;
    getAuthorPosts(authorId: string, page?: number, limit?: number): Promise<{
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
