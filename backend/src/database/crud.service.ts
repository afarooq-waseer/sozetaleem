import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { Entity } from './entities.enum';

export interface CreateOptions {
  include?: any;
  select?: any;
}

export interface FindOptions {
  where?: any;
  include?: any;
  select?: any;
  orderBy?: any;
  skip?: number;
  take?: number;
}

export interface UpdateOptions {
  where: any;
  data: any;
  include?: any;
  select?: any;
}

export interface DeleteOptions {
  where: any;
}

@Injectable()
export class CrudService {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * Create a new record
   */
  async create<T>(
    entity: Entity,
    data: any,
    options: CreateOptions = {}
  ): Promise<T> {
    const { include, select } = options;
    const args: any = { data };
    
    if (include) args.include = include;
    if (select) args.select = select;
    
    return (this.databaseService as any)[entity].create(args);
  }

  /**
   * Find a single record
   */
  async findOne<T>(
    entity: Entity,
    options: FindOptions = {}
  ): Promise<T | null> {
    const { where, include, select, orderBy, skip, take } = options;
    const args: any = {};
    
    if (where) args.where = where;
    if (include) args.include = include;
    if (select) args.select = select;
    if (orderBy) args.orderBy = orderBy;
    if (skip !== undefined) args.skip = skip;
    if (take !== undefined) args.take = take;
    
    return (this.databaseService as any)[entity].findFirst(args);
  }

  /**
   * Find a record by unique identifier
   */
  async findUnique<T>(
    entity: Entity,
    where: any,
    options: Omit<FindOptions, 'where'> = {}
  ): Promise<T | null> {
    const { include, select } = options;
    const args: any = { where };
    
    if (include) args.include = include;
    if (select) args.select = select;
    
    return (this.databaseService as any)[entity].findUnique(args);
  }

  /**
   * Find multiple records
   */
  async findMany<T>(
    entity: Entity,
    options: FindOptions = {}
  ): Promise<T[]> {
    const { where, include, select, orderBy, skip, take } = options;
    const args: any = {};
    
    if (where) args.where = where;
    if (include) args.include = include;
    if (select) args.select = select;
    if (orderBy) args.orderBy = orderBy;
    if (skip !== undefined) args.skip = skip;
    if (take !== undefined) args.take = take;
    
    return (this.databaseService as any)[entity].findMany(args);
  }

  /**
   * Update a record
   */
  async update<T>(
    entity: Entity,
    options: UpdateOptions
  ): Promise<T> {
    const { where, data, include, select } = options;
    const args: any = { where, data };
    
    if (include) args.include = include;
    if (select) args.select = select;
    
    return (this.databaseService as any)[entity].update(args);
  }

  /**
   * Update multiple records
   */
  async updateMany(
    entity: Entity,
    where: any,
    data: any
  ): Promise<{ count: number }> {
    return (this.databaseService as any)[entity].updateMany({ where, data });
  }

  /**
   * Delete a record
   */
  async delete<T>(
    entity: Entity,
    options: DeleteOptions
  ): Promise<T> {
    const { where } = options;
    
    return (this.databaseService as any)[entity].delete({ where });
  }

  /**
   * Delete multiple records
   */
  async deleteMany(
    entity: Entity,
    where: any
  ): Promise<{ count: number }> {
    return (this.databaseService as any)[entity].deleteMany({ where });
  }

  /**
   * Count records
   */
  async count(
    entity: Entity,
    where?: any
  ): Promise<number> {
    const args: any = {};
    if (where) args.where = where;
    
    return (this.databaseService as any)[entity].count(args);
  }

  /**
   * Check if record exists
   */
  async exists(
    entity: Entity,
    where: any
  ): Promise<boolean> {
    const count = await this.count(entity, where);
    return count > 0;
  }

  /**
   * Execute operations within a transaction
   */
  async transaction<T>(
    fn: (crud: CrudService) => Promise<T>
  ): Promise<T> {
    return this.databaseService.transaction(async (prisma) => {
      // Create a new CrudService instance with the transaction prisma client
      const transactionCrud = new CrudService({
        ...this.databaseService,
        ...prisma,
      } as DatabaseService);
      
      return fn(transactionCrud);
    });
  }

  /**
   * Batch create records
   */
  async batchCreate<T>(
    entity: Entity,
    dataArray: any[],
    options: CreateOptions = {}
  ): Promise<T[]> {
    return this.transaction(async (crud) => {
      const results: T[] = [];
      
      for (const data of dataArray) {
        const result = await crud.create<T>(entity, data, options);
        results.push(result);
      }
      
      return results;
    });
  }

  /**
   * Batch update records
   */
  async batchUpdate<T>(
    entity: Entity,
    updates: Array<{ where: any; data: any }>,
    options: Omit<UpdateOptions, 'where' | 'data'> = {}
  ): Promise<T[]> {
    return this.transaction(async (crud) => {
      const results: T[] = [];
      
      for (const update of updates) {
        const result = await crud.update<T>(entity, {
          ...update,
          ...options,
        });
        results.push(result);
      }
      
      return results;
    });
  }

  /**
   * Batch delete records
   */
  async batchDelete<T>(
    entity: Entity,
    whereArray: any[]
  ): Promise<T[]> {
    return this.transaction(async (crud) => {
      const results: T[] = [];
      
      for (const where of whereArray) {
        const result = await crud.delete<T>(entity, { where });
        results.push(result);
      }
      
      return results;
    });
  }
} 