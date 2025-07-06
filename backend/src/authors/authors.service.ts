import { Injectable } from '@nestjs/common';
import { CrudService } from '../database/crud.service';
import { Entity } from '../database/entities.enum';

@Injectable()
export class AuthorsService {
  constructor(private readonly crudService: CrudService) {}

  async getAllAuthors() {
    return this.crudService.findMany(Entity.USER, {
      include: {
        _count: {
          select: {
            posts: {
              where: {
                published: true
              }
            }
          }
        }
      },
      orderBy: { name: 'asc' }
    });
  }

  async getAuthorById(id: string) {
    return this.crudService.findUnique(Entity.USER, { id }, {
      include: {
        _count: {
          select: {
            posts: {
              where: {
                published: true
              }
            }
          }
        }
      }
    });
  }

  async getAuthorPosts(authorId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    // First get the author to ensure they exist
    const author = await this.getAuthorById(authorId);
    if (!author) {
      throw new Error('Author not found');
    }

    // Get all posts by this author
    const posts = await this.crudService.findMany(Entity.POST, {
      where: {
        published: true,
        author_id: authorId
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        post_categories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
              }
            }
          }
        },
        post_tags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true,
                slug: true,
              }
            }
          }
        }
      },
      orderBy: { published_at: 'desc' },
      skip,
      take: limit,
    });

    // Get total count for pagination
    const total = await this.crudService.count(Entity.POST, {
      published: true,
      author_id: authorId
    });

    return {
      author,
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      }
    };
  }
} 