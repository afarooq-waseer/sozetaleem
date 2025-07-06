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
export declare class CrudService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create<T>(entity: Entity, data: any, options?: CreateOptions): Promise<T>;
    findOne<T>(entity: Entity, options?: FindOptions): Promise<T | null>;
    findUnique<T>(entity: Entity, where: any, options?: Omit<FindOptions, 'where'>): Promise<T | null>;
    findMany<T>(entity: Entity, options?: FindOptions): Promise<T[]>;
    update<T>(entity: Entity, options: UpdateOptions): Promise<T>;
    updateMany(entity: Entity, where: any, data: any): Promise<{
        count: number;
    }>;
    delete<T>(entity: Entity, options: DeleteOptions): Promise<T>;
    deleteMany(entity: Entity, where: any): Promise<{
        count: number;
    }>;
    count(entity: Entity, where?: any): Promise<number>;
    exists(entity: Entity, where: any): Promise<boolean>;
    transaction<T>(fn: (crud: CrudService) => Promise<T>): Promise<T>;
    batchCreate<T>(entity: Entity, dataArray: any[], options?: CreateOptions): Promise<T[]>;
    batchUpdate<T>(entity: Entity, updates: Array<{
        where: any;
        data: any;
    }>, options?: Omit<UpdateOptions, 'where' | 'data'>): Promise<T[]>;
    batchDelete<T>(entity: Entity, whereArray: any[]): Promise<T[]>;
}
