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
exports.TagsService = void 0;
const common_1 = require("@nestjs/common");
const crud_service_1 = require("../database/crud.service");
const entities_enum_1 = require("../database/entities.enum");
let TagsService = class TagsService {
    crudService;
    constructor(crudService) {
        this.crudService = crudService;
    }
    async getAllTags() {
        return this.crudService.findMany(entities_enum_1.Entity.TAG, {
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
    }
    async getTagBySlug(slug) {
        return this.crudService.findOne(entities_enum_1.Entity.TAG, {
            where: {
                slug
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
            }
        });
    }
    async getPostsByTag(tagSlug, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const tag = await this.getTagBySlug(tagSlug);
        if (!tag) {
            throw new Error('Tag not found');
        }
        const posts = await this.crudService.findMany(entities_enum_1.Entity.POST, {
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
            post_tags: {
                some: {
                    tag: {
                        slug: tagSlug
                    }
                }
            }
        });
        return {
            tag,
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
    async getPopularTags(limit = 20) {
        const tags = await this.crudService.findMany(entities_enum_1.Entity.TAG, {
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
            orderBy: {
                name: 'asc'
            },
            take: limit * 2,
        });
        const tagsWithPosts = tags.filter((tag) => tag._count.posts > 0);
        tagsWithPosts.sort((a, b) => b._count.posts - a._count.posts);
        return tagsWithPosts.slice(0, limit);
    }
};
exports.TagsService = TagsService;
exports.TagsService = TagsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [crud_service_1.CrudService])
], TagsService);
//# sourceMappingURL=tags.service.js.map