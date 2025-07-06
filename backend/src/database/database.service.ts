import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  /**
   * Execute a function within a database transaction
   * @param fn - Function to execute within the transaction
   * @returns Promise with the result of the function
   */
  async transaction<T>(fn: (prisma: PrismaClient) => Promise<T>): Promise<T> {
    return this.$transaction(fn);
  }

  /**
   * Execute multiple operations within a database transaction
   * @param operations - Array of operations to execute
   * @returns Promise with array of results
   */
  async batchTransaction<T>(operations: ((prisma: PrismaClient) => Promise<T>)[]): Promise<T[]> {
    return this.$transaction(async (prisma) => {
      const results: T[] = [];
      for (const operation of operations) {
        const result = await operation(prisma as PrismaClient);
        results.push(result);
      }
      return results;
    });
  }

  /**
   * Execute operations within a transaction with rollback on error
   * @param operations - Object containing operations to execute
   * @returns Promise with the result
   */
  async transactionWithRollback<T>(
    operations: {
      execute: (prisma: PrismaClient) => Promise<T>;
      onError?: (error: Error) => Promise<void>;
      onSuccess?: (result: T) => Promise<void>;
    }
  ): Promise<T> {
    try {
      const result = await this.$transaction(operations.execute);
      if (operations.onSuccess) {
        await operations.onSuccess(result);
      }
      return result;
    } catch (error) {
      if (operations.onError) {
        await operations.onError(error as Error);
      }
      throw error;
    }
  }

  /**
   * Check if the database connection is healthy
   * @returns Promise<boolean>
   */
  async isHealthy(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }
} 