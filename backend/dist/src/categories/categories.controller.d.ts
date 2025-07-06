import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getAllCategories(): Promise<any[]>;
    getCategoryTree(): Promise<any[]>;
    getCategoryBySlug(slug: string): Promise<{}>;
    getPostsByCategory(slug: string, page?: string, limit?: string): Promise<{
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
}
