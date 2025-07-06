import { CrudService } from '../database/crud.service';
export declare class CategoriesService {
    private readonly crudService;
    constructor(crudService: CrudService);
    getAllCategories(): Promise<any[]>;
    getCategoryBySlug(slug: string): Promise<unknown>;
    getPostsByCategory(categorySlug: string, page?: number, limit?: number): Promise<{
        category: {};
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
    getCategoryTree(): Promise<any[]>;
}
