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
exports.AuthorsService = void 0;
const common_1 = require("@nestjs/common");
const crud_service_1 = require("../database/crud.service");
const entities_enum_1 = require("../database/entities.enum");
let AuthorsService = class AuthorsService {
    crudService;
    constructor(crudService) {
        this.crudService = crudService;
    }
    async getAllAuthors() {
        return this.crudService.findMany(entities_enum_1.Entity.USER, {
            include: {
                _count: {
                    select: {
                        posts: {
                            where: {
                                published: true
                            }
                        }
                    }
                }
            },
            orderBy: { name: 'asc' }
        });
    }
    async getAuthorById(id) {
        return this.crudService.findUnique(entities_enum_1.Entity.USER, { id }, {
            include: {
                _count: {
                    select: {
                        posts: {
                            where: {
                                published: true
                            }
                        }
                    }
                }
            }
        });
    }
    async getAuthorPosts(authorId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const author = await this.getAuthorById(authorId);
        if (!author) {
            throw new Error('Author not found');
        }
        const posts = await this.crudService.findMany(entities_enum_1.Entity.POST, {
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
            author_id: authorId
        });
        return {
            author,
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
};
exports.AuthorsService = AuthorsService;
exports.AuthorsService = AuthorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [crud_service_1.CrudService])
], AuthorsService);
//# sourceMappingURL=authors.service.js.map