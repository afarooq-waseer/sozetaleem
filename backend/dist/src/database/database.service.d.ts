import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    transaction<T>(fn: (prisma: PrismaClient) => Promise<T>): Promise<T>;
    batchTransaction<T>(operations: ((prisma: PrismaClient) => Promise<T>)[]): Promise<T[]>;
    transactionWithRollback<T>(operations: {
        execute: (prisma: PrismaClient) => Promise<T>;
        onError?: (error: Error) => Promise<void>;
        onSuccess?: (result: T) => Promise<void>;
    }): Promise<T>;
    isHealthy(): Promise<boolean>;
}
