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
var CrudService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("./database.service");
let CrudService = CrudService_1 = class CrudService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async create(entity, data, options = {}) {
        const { include, select } = options;
        const args = { data };
        if (include)
            args.include = include;
        if (select)
            args.select = select;
        return this.databaseService[entity].create(args);
    }
    async findOne(entity, options = {}) {
        const { where, include, select, orderBy, skip, take } = options;
        const args = {};
        if (where)
            args.where = where;
        if (include)
            args.include = include;
        if (select)
            args.select = select;
        if (orderBy)
            args.orderBy = orderBy;
        if (skip !== undefined)
            args.skip = skip;
        if (take !== undefined)
            args.take = take;
        return this.databaseService[entity].findFirst(args);
    }
    async findUnique(entity, where, options = {}) {
        const { include, select } = options;
        const args = { where };
        if (include)
            args.include = include;
        if (select)
            args.select = select;
        return this.databaseService[entity].findUnique(args);
    }
    async findMany(entity, options = {}) {
        const { where, include, select, orderBy, skip, take } = options;
        const args = {};
        if (where)
            args.where = where;
        if (include)
            args.include = include;
        if (select)
            args.select = select;
        if (orderBy)
            args.orderBy = orderBy;
        if (skip !== undefined)
            args.skip = skip;
        if (take !== undefined)
            args.take = take;
        return this.databaseService[entity].findMany(args);
    }
    async update(entity, options) {
        const { where, data, include, select } = options;
        const args = { where, data };
        if (include)
            args.include = include;
        if (select)
            args.select = select;
        return this.databaseService[entity].update(args);
    }
    async updateMany(entity, where, data) {
        return this.databaseService[entity].updateMany({ where, data });
    }
    async delete(entity, options) {
        const { where } = options;
        return this.databaseService[entity].delete({ where });
    }
    async deleteMany(entity, where) {
        return this.databaseService[entity].deleteMany({ where });
    }
    async count(entity, where) {
        const args = {};
        if (where)
            args.where = where;
        return this.databaseService[entity].count(args);
    }
    async exists(entity, where) {
        const count = await this.count(entity, where);
        return count > 0;
    }
    async transaction(fn) {
        return this.databaseService.transaction(async (prisma) => {
            const transactionCrud = new CrudService_1({
                ...this.databaseService,
                ...prisma,
            });
            return fn(transactionCrud);
        });
    }
    async batchCreate(entity, dataArray, options = {}) {
        return this.transaction(async (crud) => {
            const results = [];
            for (const data of dataArray) {
                const result = await crud.create(entity, data, options);
                results.push(result);
            }
            return results;
        });
    }
    async batchUpdate(entity, updates, options = {}) {
        return this.transaction(async (crud) => {
            const results = [];
            for (const update of updates) {
                const result = await crud.update(entity, {
                    ...update,
                    ...options,
                });
                results.push(result);
            }
            return results;
        });
    }
    async batchDelete(entity, whereArray) {
        return this.transaction(async (crud) => {
            const results = [];
            for (const where of whereArray) {
                const result = await crud.delete(entity, { where });
                results.push(result);
            }
            return results;
        });
    }
};
exports.CrudService = CrudService;
exports.CrudService = CrudService = CrudService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CrudService);
//# sourceMappingURL=crud.service.js.map