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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const crud_service_1 = require("../database/crud.service");
const entities_enum_1 = require("../database/entities.enum");
let PostsService = class PostsService {
    crudService;
    constructor(crudService) {
        this.crudService = crudService;
    }
    async getAllPosts(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        return this.crudService.findMany(entities_enum_1.Entity.POST, {
            where: {
                published: true
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
    }
    async getPostBySlug(slug) {
        return this.crudService.findOne(entities_enum_1.Entity.POST, {
            where: {
                slug,
                published: true
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
                                description: true,
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
                },
                post_images: {
                    select: {
                        id: true,
                        url: true,
                        alt_text: true,
                    }
                }
            }
        });
    }
    async getFeaturedPosts(limit = 5) {
        return this.crudService.findMany(entities_enum_1.Entity.POST, {
            where: {
                published: true,
                featured: true
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
    }
    async getRecentPosts(limit = 10) {
        return this.crudService.findMany(entities_enum_1.Entity.POST, {
            where: {
                published: true
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
    }
    async getPopularPosts(limit = 10) {
        return this.crudService.findMany(entities_enum_1.Entity.POST, {
            where: {
                published: true
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
            orderBy: { view_count: 'desc' },
            take: limit,
        });
    }
    async searchPosts(query, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        return this.crudService.findMany(entities_enum_1.Entity.POST, {
            where: {
                AND: [
                    { published: true },
                    {
                        OR: [
                            { title: { contains: query, mode: 'insensitive' } },
                            { content: { contains: query, mode: 'insensitive' } },
                            { content_text: { contains: query, mode: 'insensitive' } },
                            { meta_description: { contains: query, mode: 'insensitive' } },
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
            skip,
            take: limit,
        });
    }
    async getPostsByCategory(categorySlug, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        return this.crudService.findMany(entities_enum_1.Entity.POST, {
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
                }
            },
            orderBy: { published_at: 'desc' },
            skip,
            take: limit,
        });
    }
    async getPostsByTag(tagSlug, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        return this.crudService.findMany(entities_enum_1.Entity.POST, {
            where: {
                published: true,
                post_tags: {
                    some: {
                        tag: {
                            slug: tagSlug
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
    }
    async getPostsByAuthor(authorId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        return this.crudService.findMany(entities_enum_1.Entity.POST, {
            where: {
                published: true,
                author_id: authorId
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
            skip,
            take: limit,
        });
    }
    async incrementViewCount(slug) {
        const post = await this.crudService.findOne(entities_enum_1.Entity.POST, {
            where: { slug }
        });
        if (!post) {
            throw new Error('Post not found');
        }
        return this.crudService.update(entities_enum_1.Entity.POST, {
            where: { slug },
            data: { view_count: { increment: 1 } }
        });
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [crud_service_1.CrudService])
], PostsService);
//# sourceMappingURL=posts.service.js.map