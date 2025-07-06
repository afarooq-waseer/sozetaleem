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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const crud_service_1 = require("../database/crud.service");
const entities_enum_1 = require("../database/entities.enum");
let CategoriesService = class CategoriesService {
    crudService;
    constructor(crudService) {
        this.crudService = crudService;
    }
    async getAllCategories() {
        const categories = await this.crudService.findMany(entities_enum_1.Entity.CATEGORY, {
            include: {
                parent: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    }
                },
                children: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        description: true,
                        children: {
                            select: {
                                id: true,
                                name: true,
                                slug: true,
                                description: true,
                            }
                        }
                    }
                },
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
            orderBy: { name: 'asc' }
        });
        return categories.filter((category) => !category.parent_id);
    }
    async getCategoryBySlug(slug) {
        return this.crudService.findOne(entities_enum_1.Entity.CATEGORY, {
            where: {
                slug
            },
            include: {
                parent: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    }
                },
                children: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        description: true,
                    }
                },
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
            }
        });
    }
    async getPostsByCategory(categorySlug, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const category = await this.getCategoryBySlug(categorySlug);
        if (!category) {
            throw new Error('Category not found');
        }
        const posts = await this.crudService.findMany(entities_enum_1.Entity.POST, {
            where: {
                published: true,
                post_categories: {
                    some: {
                        category: {
                            slug: categorySlug
                        }
                    }
                }
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
                },
                post_tags: {
                    include: {
                        tag: {
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
            skip,
            take: limit,
        });
        const total = await this.crudService.count(entities_enum_1.Entity.POST, {
            published: true,
            post_categories: {
                some: {
                    category: {
                        slug: categorySlug
                    }
                }
            }
        });
        return {
            category,
            posts,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNext: page * limit < total,
                hasPrev: page > 1,
            }
        };
    }
    async getCategoryTree() {
        const categories = await this.crudService.findMany(entities_enum_1.Entity.CATEGORY, {
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
            orderBy: { name: 'asc' }
        });
        const categoryMap = new Map();
        const roots = [];
        categories.forEach((category) => {
            categoryMap.set(category.id, {
                ...category,
                children: []
            });
        });
        categories.forEach((category) => {
            const categoryWithChildren = categoryMap.get(category.id);
            if (category.parent_id) {
                const parent = categoryMap.get(category.parent_id);
                if (parent) {
                    parent.children.push(categoryWithChildren);
                }
            }
            else {
                roots.push(categoryWithChildren);
            }
        });
        return roots;
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [crud_service_1.CrudService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map