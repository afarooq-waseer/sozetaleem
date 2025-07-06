"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const crud_service_1 = require("../database/crud.service");
const entities_enum_1 = require("../database/entities.enum");
let SearchService = class SearchService {
    crudService;
    constructor(crudService) {
        this.crudService = crudService;
    }
    async globalSearch(query, limit = 10) {
        if (!query || query.trim().length < 2) {
            return {
                posts: [],
                categories: [],
                tags: [],
                total: 0
            };
        }
        const searchQuery = query.trim();
        const posts = await this.crudService.findMany(entities_enum_1.Entity.POST, {
            where: {
                AND: [
                    { published: true },
                    {
                        OR: [
                            { title: { contains: searchQuery, mode: 'insensitive' } },
                            { content: { contains: searchQuery, mode: 'insensitive' } },
                            { content_text: { contains: searchQuery, mode: 'insensitive' } },
                            { meta_description: { contains: searchQuery, mode: 'insensitive' } },
                        ]
                    }
                ]
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                post_categories: {
                    include: {
                        category: {
                            select: {
                                id: true,
                                name: true,
                                slug: true,
                            }
                        }
                    }
                }
            },
            orderBy: { published_at: 'desc' },
            take: limit,
        });
        const categories = await this.crudService.findMany(entities_enum_1.Entity.CATEGORY, {
            where: {
                OR: [
                    { name: { contains: searchQuery, mode: 'insensitive' } },
                    { description: { contains: searchQuery, mode: 'insensitive' } },
                ]
            },
            include: {
                _count: {
                    select: {
                        posts: {
                            where: {
                                post: {
                                    published: true
                                }
                            }
                        }
                    }
                }
            },
            orderBy: { name: 'asc' },
            take: Math.min(limit, 5),
        });
        const tags = await this.crudService.findMany(entities_enum_1.Entity.TAG, {
            where: {
                name: { contains: searchQuery, mode: 'insensitive' }
            },
            include: {
                _count: {
                    select: {
                        posts: {
                            where: {
                                post: {
                                    published: true
                                }
                            }
                        }
                    }
                }
            },
            orderBy: { name: 'asc' },
            take: Math.min(limit, 5),
        });
        const total = posts.length + categories.length + tags.length;
        return {
            posts,
            categories,
            tags,
            total,
            query: searchQuery
        };
    }
    async getSearchSuggestions(query, limit = 5) {
        if (!query || query.trim().length < 2) {
            return [];
        }
        const searchQuery = query.trim();
        const postTitles = await this.crudService.findMany(entities_enum_1.Entity.POST, {
            where: {
                AND: [
                    { published: true },
                    { title: { contains: searchQuery, mode: 'insensitive' } }
                ]
            },
            select: {
                title: true,
                slug: true,
            },
            orderBy: { view_count: 'desc' },
            take: limit,
        });
        const categoryNames = await this.crudService.findMany(entities_enum_1.Entity.CATEGORY, {
            where: {
                name: { contains: searchQuery, mode: 'insensitive' }
            },
            select: {
                name: true,
                slug: true,
            },
            orderBy: { name: 'asc' },
            take: Math.min(limit, 3),
        });
        const tagNames = await this.crudService.findMany(entities_enum_1.Entity.TAG, {
            where: {
                name: { contains: searchQuery, mode: 'insensitive' }
            },
            select: {
                name: true,
                slug: true,
            },
            orderBy: { name: 'asc' },
            take: Math.min(limit, 3),
        });
        const suggestions = [
            ...postTitles.map((post) => ({
                type: 'post',
                title: post.title,
                slug: post.slug,
                url: `/posts/${post.slug}`
            })),
            ...categoryNames.map((category) => ({
                type: 'category',
                title: category.name,
                slug: category.slug,
                url: `/categories/${category.slug}`
            })),
            ...tagNames.map((tag) => ({
                type: 'tag',
                title: tag.name,
                slug: tag.slug,
                url: `/tags/${tag.slug}`
            }))
        ];
        return suggestions.slice(0, limit);
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [crud_service_1.CrudService])
], SearchService);
//# sourceMappingURL=search.service.js.map