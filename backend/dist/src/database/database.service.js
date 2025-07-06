"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let DatabaseService = class DatabaseService extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
    async transaction(fn) {
        return this.$transaction(fn);
    }
    async batchTransaction(operations) {
        return this.$transaction(async (prisma) => {
            const results = [];
            for (const operation of operations) {
                const result = await operation(prisma);
                results.push(result);
            }
            return results;
        });
    }
    async transactionWithRollback(operations) {
        try {
            const result = await this.$transaction(operations.execute);
            if (operations.onSuccess) {
                await operations.onSuccess(result);
            }
            return result;
        }
        catch (error) {
            if (operations.onError) {
                await operations.onError(error);
            }
            throw error;
        }
    }
    async isHealthy() {
        try {
            await this.$queryRaw `SELECT 1`;
            return true;
        }
        catch {
            return false;
        }
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)()
], DatabaseService);
//# sourceMappingURL=database.service.js.map