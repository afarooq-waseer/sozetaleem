import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Controller('health')
export class HealthController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  async checkHealth() {
    const isDbHealthy = await this.databaseService.isHealthy();
    
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: {
        status: isDbHealthy ? 'healthy' : 'unhealthy',
      },
    };
  }

  @Get('database')
  async checkDatabaseHealth() {
    const isHealthy = await this.databaseService.isHealthy();
    
    return {
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
    };
  }
} 