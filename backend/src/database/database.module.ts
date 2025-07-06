import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { CrudService } from './crud.service';

@Global()
@Module({
  providers: [DatabaseService, CrudService],
  exports: [DatabaseService, CrudService],
})
export class DatabaseModule {} 