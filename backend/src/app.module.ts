import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { HealthController } from './health/health.controller';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { AuthorsModule } from './authors/authors.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    DatabaseModule,
    PostsModule,
    CategoriesModule,
    TagsModule,
    AuthorsModule,
    SearchModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
