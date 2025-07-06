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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const crud_service_1 = require("../database/crud.service");
const entities_enum_1 = require("../database/entities.enum");
let UsersService = class UsersService {
    crudService;
    constructor(crudService) {
        this.crudService = crudService;
    }
    async createUser(createUserDto) {
        return this.crudService.create(entities_enum_1.Entity.USER, createUserDto);
    }
    async findAllUsers() {
        return this.crudService.findMany(entities_enum_1.Entity.USER, {
            include: {
                posts: true,
            },
        });
    }
    async findUserById(id) {
        return this.crudService.findUnique(entities_enum_1.Entity.USER, { id }, {
            include: {
                posts: true,
            },
        });
    }
    async findUserByEmail(email) {
        return this.crudService.findOne(entities_enum_1.Entity.USER, {
            where: { email },
            include: {
                posts: true,
            },
        });
    }
    async updateUser(id, updateData) {
        return this.crudService.update(entities_enum_1.Entity.USER, {
            where: { id },
            data: updateData,
        });
    }
    async deleteUser(id) {
        return this.crudService.delete(entities_enum_1.Entity.USER, { where: { id } });
    }
    async createPost(authorId, createPostDto) {
        return this.crudService.create(entities_enum_1.Entity.POST, {
            ...createPostDto,
            authorId,
        });
    }
    async findPostsByAuthor(authorId) {
        return this.crudService.findMany(entities_enum_1.Entity.POST, {
            where: { authorId },
            include: {
                author: true,
            },
        });
    }
    async updatePost(id, updateData) {
        return this.crudService.update(entities_enum_1.Entity.POST, {
            where: { id },
            data: updateData,
        });
    }
    async deletePost(id) {
        return this.crudService.delete(entities_enum_1.Entity.POST, { where: { id } });
    }
    async createUserWithPost(createUserDto, createPostDto) {
        return this.crudService.transaction(async (crud) => {
            const user = await crud.create(entities_enum_1.Entity.USER, createUserDto);
            const post = await crud.create(entities_enum_1.Entity.POST, {
                ...createPostDto,
                authorId: user.id,
            });
            return { user, post };
        });
    }
    async transferPosts(fromUserId, toUserId) {
        return this.crudService.transaction(async (crud) => {
            const fromUser = await crud.findUnique(entities_enum_1.Entity.USER, { id: fromUserId });
            const toUser = await crud.findUnique(entities_enum_1.Entity.USER, { id: toUserId });
            if (!fromUser || !toUser) {
                throw new Error('One or both users not found');
            }
            const result = await crud.updateMany(entities_enum_1.Entity.POST, { authorId: fromUserId }, { authorId: toUserId });
            return result.count;
        });
    }
    async batchCreateUsers(users) {
        return this.crudService.batchCreate(entities_enum_1.Entity.USER, users);
    }
    async getUserStats() {
        const totalUsers = await this.crudService.count(entities_enum_1.Entity.USER);
        const totalPosts = await this.crudService.count(entities_enum_1.Entity.POST);
        const publishedPosts = await this.crudService.count(entities_enum_1.Entity.POST, { published: true });
        return {
            totalUsers,
            totalPosts,
            publishedPosts,
            unpublishedPosts: totalPosts - publishedPosts,
        };
    }
    async userExists(email) {
        return this.crudService.exists(entities_enum_1.Entity.USER, { email });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [crud_service_1.CrudService])
], UsersService);
//# sourceMappingURL=users.service.js.map