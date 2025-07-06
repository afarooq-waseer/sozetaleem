import { DatabaseService } from '../database/database.service';
export declare class HealthController {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    checkHealth(): Promise<{
        status: string;
        timestamp: string;
        database: {
            status: string;
        };
    }>;
    checkDatabaseHealth(): Promise<{
        status: string;
        timestamp: string;
    }>;
}
