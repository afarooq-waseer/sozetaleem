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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorsController = void 0;
const common_1 = require("@nestjs/common");
const authors_service_1 = require("./authors.service");
let AuthorsController = class AuthorsController {
    authorsService;
    constructor(authorsService) {
        this.authorsService = authorsService;
    }
    async getAllAuthors() {
        return this.authorsService.getAllAuthors();
    }
    async getAuthorById(id) {
        const author = await this.authorsService.getAuthorById(id);
        if (!author) {
            throw new common_1.NotFoundException('Author not found');
        }
        return author;
    }
    async getAuthorPosts(authorId, page = '1', limit = '10') {
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        try {
            return await this.authorsService.getAuthorPosts(authorId, pageNum, limitNum);
        }
        catch (error) {
            throw new common_1.NotFoundException('Author not found');
        }
    }
};
exports.AuthorsController = AuthorsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthorsController.prototype, "getAllAuthors", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthorsController.prototype, "getAuthorById", null);
__decorate([
    (0, common_1.Get)(':id/posts'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AuthorsController.prototype, "getAuthorPosts", null);
exports.AuthorsController = AuthorsController = __decorate([
    (0, common_1.Controller)('api/authors'),
    __metadata("design:paramtypes", [authors_service_1.AuthorsService])
], AuthorsController);
//# sourceMappingURL=authors.controller.js.map